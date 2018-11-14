// @flow

import Promise from 'bluebird'
import keystore from '@jibrelnetwork/jwallet-web-keystore'
import { put, select, takeEvery, take, race, call, all } from 'redux-saga/effects'

import InvalidFieldError from 'utils/errors/InvalidFieldError'

import {
  selectAddAsset,
  selectDigitalAsset,
} from 'store/stateSelectors'

import { backOrFallback } from 'routes/modules'

import web3 from 'services/web3'

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

import {
  addCustomAsset,
} from '../../../modules/digitalAssets'

const {
  getContractName,
  getContractSymbol,
  getContractDecimals,
  getContractCode,
  checkContractCodeIsERC20,
} = web3

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
  contractAddress: Address
): Saga<string | number | void> {
  try {
    const result = yield call(contractMethod, contractAddress)
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

function* checkAssetIsERC20Compatible(contractAddress: Address): Saga<boolean> {
  const contractCode: string = yield call(getContractCode, contractAddress)
  return checkContractCodeIsERC20(contractCode)
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

  if (!keystore.checkAddressValid(contractAddress)) {
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
        name: requestAssetField(getContractName, contractAddress),
        symbol: requestAssetField(getContractSymbol, contractAddress),
        decimals: requestAssetField(getContractDecimals, contractAddress),
        isERC20: checkAssetIsERC20Compatible(contractAddress),
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
      address,
      name,
      symbol,
      decimals,
    },
  }: ExtractReturn<typeof selectAddAsset> = yield select(selectAddAsset)

  const contractAddress = address.trim()
  const contractName = name.trim()
  const contractSymbol = symbol.trim()
  const contractDecimals = parseInt(decimals, 10)

  if (isAssetLoaded && !isAssetValid) {
    // the error is already shows for the address field
    return
  }

  yield* clearFieldsError()

  // check contract address
  if (!keystore.checkAddressValid(contractAddress)) {
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

  if (Number.isNaN(contractDecimals) ||
    contractDecimals <= 0 ||
    contractDecimals > 127) {
    yield put(
      setFieldError('decimals', 'Digital asset decimals should be a number between 1...127')
    )
  }

  const {
    invalidFields: {
      address: addressError,
      name: nameError,
      symbol: symbolError,
      decimals: decimalsError,
    },
  }: ExtractReturn<typeof selectAddAsset> = yield select(selectAddAsset)

  if (!addressError &&
      !nameError &&
      !symbolError &&
      !decimalsError) {
    yield put(addCustomAsset(contractAddress, contractName, contractSymbol, contractDecimals))
    yield put(backOrFallback('/digital-assets'))
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
