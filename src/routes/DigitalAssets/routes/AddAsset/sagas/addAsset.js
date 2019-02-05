// @flow

import Promise from 'bluebird'

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
import reactRouterBack from 'utils/browser/reactRouterBack'
import InvalidFieldError from 'utils/errors/InvalidFieldError'
import { selectCurrentNetwork } from 'store/selectors/networks'

import {
  checkAddressValid,
  getAddressChecksum,
} from 'utils/address'

import {
  selectAddAsset,
  selectDigitalAsset,
} from 'store/selectors/digitalAssets'

import * as blocks from 'routes/modules/blocks'
import * as ticker from 'routes/modules/ticker'

import {
  OPEN_VIEW,
  CLOSE_VIEW,
  SET_FIELD,
  START_ASSET_LOADING,
  clean,
  setField,
  setFieldError,
  clearFieldError,
  setIsAssetValid,
  startAssetLoading,
  SUBMIT_ASSET_FORM,
} from '../modules/addAsset'

import * as digitalAssets from '../../../modules/digitalAssets'

type RequestedAssetFields = {|
  decimals: ?number,
  name: ?string,
  symbol: ?string,
  isERC20: ?boolean,
|}

const ZERO_HEX = '0x'

/**
 * Request not required field from contract
 */
function* requestAssetField(
  contractMethod: Function,
  network: Network,
  contractAddress: AssetAddress,
): Saga<string | number | void> {
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
  yield put(setField('name', ''))
  yield put(setField('symbol', ''))
  yield put(setField('decimals', ''))
}

function* clearFieldsError(): Saga<void> {
  yield put(clearFieldError('address'))
  yield put(clearFieldError('name'))
  yield put(clearFieldError('symbol'))
  yield put(clearFieldError('decimals'))
}

/**
 * Fires, when user changes fields on CustomAssetForm
 */
function* onFieldChange(action: ExtractReturn<typeof setField>): Saga<void> {
  const network: ExtractReturn<typeof selectCurrentNetwork> = yield select(selectCurrentNetwork)

  if (!network) {
    throw new Error('Active network does not exist')
  }

  const { fieldName, value } = action.payload

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
      throw new InvalidFieldError('address', i18n('general.error.address.exists'))
    }

    // set loading, shows loader on address input, update requestedAddress
    yield put(startAssetLoading(contractAddress))

    // wait for result or cancel all
    const { result } = yield race({
      result: all({
        name: requestAssetField(web3.getAssetName, network, contractAddress),
        symbol: requestAssetField(web3.getAssetSymbol, network, contractAddress),
        decimals: requestAssetField(web3.getAssetDecimals, network, contractAddress),
        isERC20: checkAssetIsERC20Compatible(network, contractAddress),
      }),
      // cancel on close Add/Edit asset screen
      close: take(CLOSE_VIEW),
      // cancel, when we are trying to request another contract
      restart: take(START_ASSET_LOADING),
    })

    if (result && result.isERC20) {
      const { name, symbol, decimals }: RequestedAssetFields = result

      yield put(setIsAssetValid(true))
      yield put(setField('name', name || ''))
      yield put(setField('symbol', symbol || ''))
      yield put(setField('decimals', decimals ? decimals.toString() : ''))
    } else if (result) {
      throw new InvalidFieldError('address', i18n('general.error.address.notERC20'))
    }
  } catch (err) {
    yield put(setIsAssetValid(false))

    if (err instanceof InvalidFieldError) {
      yield put(setFieldError(err.fieldName, err.message))
    } else {
      yield put(setFieldError('address', i18n('general.error.network.connection')))
    }
  }
}

function* onAssetFormSumbit(): Saga<void> {
  const {
    isAssetValid,
    isAssetLoaded,
    formFields: {
      name,
      symbol,
      address,
      decimals,
    },
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
    yield put(setFieldError('address', 'Invalid ERC-20 contract address'))
    return
  }

  if (!isAssetLoaded) {
    yield put(setFieldError('address', 'Please wait for asset validity check'))
    return
  }

  // Check if this asset already exists
  const foundAsset: ?DigitalAsset = yield select(selectDigitalAsset, contractAddress)

  if (foundAsset) {
    yield put(setFieldError('address', i18n('general.error.address.exists')))
    return
  }

  if (contractName.length === 0) {
    yield put(setFieldError('name', 'Valid digital asset name is required'))
  }

  if (contractSymbol.length === 0 || contractSymbol.length > 10) {
    yield put(setFieldError('symbol', 'Valid digital asset symbol is required'))
  }

  if (
    Number.isNaN(contractDecimals) ||
    contractDecimals < 0 ||
    contractDecimals > 127
  ) {
    yield put(
      setFieldError('decimals', 'Digital asset decimals should be a number between 0...127')
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
      digitalAssets.addCustomAsset(checksumAddres, contractName, contractSymbol, contractDecimals),
    )

    yield put(reactRouterBack({ fallbackUrl: '/digital-assets' }))
    yield put(blocks.syncRestart())
    yield put(ticker.syncRestart())
  }
}

function* addAssetOpen(): Saga<void> {
  yield put(clean())
}

export function* addAssetRootSaga(): Saga<void> {
  yield takeEvery(OPEN_VIEW, addAssetOpen)
  yield takeEvery(SET_FIELD, onFieldChange)
  yield takeEvery(SUBMIT_ASSET_FORM, onAssetFormSumbit)
}
