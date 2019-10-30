// @flow strict

import Promise from 'bluebird'
import { i18n } from 'i18n/lingui'
import { actions } from 'redux-router5'

import {
  all,
  put,
  call,
  race,
  take,
  select,
  takeEvery,
} from 'redux-saga/effects'

import web3 from 'services/web3'
import InvalidFieldError from 'utils/errors/InvalidFieldError'
import { toastsPlugin } from 'store/plugins'
import { gaSendEvent } from 'utils/analytics'
import { selectCurrentNetworkOrThrow } from 'store/selectors/networks'

import {
  checkAddressValid,
  getAddressChecksum,
} from 'utils/address'

import {
  selectAddAsset,
  selectDigitalAsset,
} from 'store/selectors/digitalAssets'

import * as blocks from 'store/modules/blocks'
import * as addAsset from 'store/modules/addAsset'
import * as digitalAssets from 'store/modules/digitalAssets'

type ContractMethodResult = string | number

const ZERO_HEX = '0x'

/**
 * Request not required field from contract
 */
function* requestAssetField(
  contractMethod: Function,
  network: Network,
  contractAddress: AssetAddress,
): Saga<?ContractMethodResult> {
  try {
    const result = yield call(contractMethod, network, contractAddress)

    if (result === ZERO_HEX) {
      return null
    } else {
      return result
    }
  } catch (err) {
    // catch Web3 network error
    if (err instanceof Promise.TimeoutError ||
      (err.isOperational && err.cause.name !== 'BigNumber Error')) {
      throw err
    } else {
      return null
    }
  }
}

function* checkAssetIsERC20Compatible(
  network: Network,
  contractAddress: AssetAddress,
): Saga<boolean> {
  const contractCode: string = yield call(web3.getSmartContractCode, network, contractAddress)

  return web3.checkERC20InterfaceCode(contractCode)
}

function* clearFields(): Saga<void> {
  yield put(addAsset.setField('name', ''))
  yield put(addAsset.setField('symbol', ''))
  yield put(addAsset.setField('decimals', ''))
}

function* clearFieldsError(): Saga<void> {
  yield put(addAsset.clearFieldError('address'))
  yield put(addAsset.clearFieldError('name'))
  yield put(addAsset.clearFieldError('symbol'))
  yield put(addAsset.clearFieldError('decimals'))
}

/**
 * Fires, when user changes fields on CustomAssetForm
 */
function* onFieldChange(action: ExtractReturn<typeof addAsset.setField>): Saga<void> {
  const network: ExtractReturn<typeof selectCurrentNetworkOrThrow>
    = yield select(selectCurrentNetworkOrThrow)

  const {
    value,
    fieldName,
  } = action.payload

  /**
   * Address field validation
   * This input is avalable only in add asset page, in edit asset is is disabled
   */
  if (fieldName !== 'address') {
    return
  }

  const contractAddress: Address = value.trim()

  // check if we are already requesting this address...
  const {
    requestedAddress,
  }: ExtractReturn<typeof selectAddAsset> = yield select(selectAddAsset)

  if (requestedAddress === contractAddress) {
    return
  }

  if (!checkAddressValid(contractAddress)) {
    return
  }

  yield* clearFields()
  yield* clearFieldsError()

  try {
    // Check if this asset already exists
    const foundAsset: ?DigitalAsset = yield select(selectDigitalAsset, contractAddress)

    if (foundAsset) {
      throw new InvalidFieldError(
        'address',
        i18n._(
          'AssetsItemAdd.errors.exists',
          null,
          { defaults: 'This asset already exists' },
        ),
      )
    }

    // set loading, shows loader on address input, update requestedAddress
    yield put(addAsset.startAssetLoading(contractAddress))

    // wait for result or cancel all
    const { result } = yield race({
      result: all({
        name: requestAssetField(web3.getAssetName, network, contractAddress),
        symbol: requestAssetField(web3.getAssetSymbol, network, contractAddress),
        decimals: requestAssetField(web3.getAssetDecimals, network, contractAddress),
        isERC20: checkAssetIsERC20Compatible(network, contractAddress),
      }),
      // cancel on close Add/Edit asset screen
      close: take(addAsset.CLOSE_VIEW),
      // cancel, when we are trying to request another contract
      restart: take(addAsset.START_ASSET_LOADING),
    })

    if (result && result.isERC20) {
      const isDecimalsNumber: boolean = (typeof result.decimals === 'number')

      const name: string = result.name || ''
      const symbol: string = result.symbol || ''
      const decimals: string = isDecimalsNumber ? (result.decimals || '').toString() : ''

      yield put(addAsset.setIsAssetValid(true))
      yield put(addAsset.setField('name', name))
      yield put(addAsset.setField('symbol', symbol))
      yield put(addAsset.setField('decimals', decimals))

      yield put(addAsset.setHasDefaultFields(
        !!name.length && !!symbol.length && !!decimals.length,
      ))
    } else if (result) {
      throw new InvalidFieldError(
        'address',
        i18n._(
          'AssetsItemAdd.errors.assetNotCompatible',
          null,
          { defaults: 'This asset is not ERC20 compatible' },
        ),
      )
    }
  } catch (err) {
    yield put(addAsset.setIsAssetValid(false))

    if (err instanceof InvalidFieldError) {
      yield put(addAsset.setFieldError(err.fieldName, err.message))
    } else {
      yield put(addAsset.setFieldError(
        'address',
        i18n._(
          'AssetsItemAdd.errors.noConnection',
          null,
          { defaults: 'Network connection error' },
        ),
      ))
    }
  }
}

function* onAssetFormSumbit(): Saga<void> {
  const {
    formFields: {
      name,
      symbol,
      address,
      decimals,
    },
    isAssetValid,
    isAssetLoaded,
    hasDefaultFields,
  }: ExtractReturn<typeof selectAddAsset> = yield select(selectAddAsset)

  const contractName = name.trim()
  const contractSymbol = symbol.trim()
  const contractAddress = address.trim()
  const contractDecimals = parseInt(decimals, 10)

  if (isAssetLoaded && !isAssetValid) {
    // the error is already shows for the address field
    return
  }

  yield* clearFieldsError()

  // check contract address
  if (!checkAddressValid(contractAddress)) {
    yield put(addAsset.setFieldError(
      'address',
      i18n._(
        'AssetsItemAdd.errors.invalidAddress',
        null,
        { defaults: 'Invalid ERC-20 contract address' },
      ),
    ))

    return
  }

  if (!isAssetLoaded) {
    yield put(addAsset.setFieldError(
      'address',
      i18n._(
        'AssetsItemAdd.errors.waitForValidation',
        null,
        { defaults: 'Please wait for asset validity check' },
      ),
    ))

    return
  }

  // Check if this asset already exists
  const foundAsset: ?DigitalAsset = yield select(selectDigitalAsset, contractAddress)

  if (foundAsset) {
    yield put(addAsset.setFieldError(
      'address',
      i18n._(
        'AssetsItemAdd.errors.exists',
        null,
        { defaults: 'This asset already exists' },
      ),
    ))

    return
  }

  if (contractName.length === 0) {
    yield put(addAsset.setFieldError(
      'name',
      i18n._(
        'AssetsItemAdd.errors.emptyName',
        null,
        { defaults: 'Valid digital asset name is required' },
      ),
    ))
  }

  if (contractSymbol.length === 0 || contractSymbol.length > 10) {
    yield put(addAsset.setFieldError(
      'symbol',
      i18n._(
        'AssetsItemAdd.errors.symbolLength',
        null,
        { defaults: 'Valid digital asset symbol is required' },
      ),
    ))
  }

  if (
    Number.isNaN(contractDecimals) ||
    contractDecimals < 0 ||
    contractDecimals > 127
  ) {
    yield put(
      addAsset.setFieldError(
        'decimals',
        i18n._(
          'AssetsItemAdd.errors.decimals',
          null,
          { defaults: 'Digital asset decimals should be a number between 0...127' },
        ),
      ),
    )
  }

  const {
    invalidFields: {
      name: nameError,
      symbol: symbolError,
      address: addressError,
      decimals: decimalsError,
    },
  }: ExtractReturn<typeof selectAddAsset> = yield select(selectAddAsset)

  const checksumAddres: Address = getAddressChecksum(contractAddress)

  if (
    !nameError &&
    !symbolError &&
    !addressError &&
    !decimalsError
  ) {
    yield put(
      digitalAssets.addCustomAsset({
        hasDefaultFields,
        name: contractName,
        symbol: contractSymbol,
        address: checksumAddres,
        decimals: contractDecimals,
      }),
    )

    yield put(actions.navigateTo('Home'))

    toastsPlugin.showToast(i18n._(
      'AssetsItemAdd.toast',
      null,
      { defaults: 'Asset added' },
    ))

    gaSendEvent(
      'AssetManager',
      'AddedCustomAsset',
      checksumAddres,
    )

    yield put(blocks.syncRestart())
  }
}

function* addAssetOpen(): Saga<void> {
  yield put(addAsset.clean())
}

export function* digitalAssetsAddRootSaga(): Saga<void> {
  yield takeEvery(addAsset.OPEN_VIEW, addAssetOpen)
  yield takeEvery(addAsset.SET_FIELD, onFieldChange)
  yield takeEvery(addAsset.SUBMIT_ASSET_FORM, onAssetFormSumbit)
}
