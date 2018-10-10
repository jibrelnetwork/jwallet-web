// @flow

import Keystore from 'jwallet-web-keystore'
import { put, select, takeEvery, take, race, call, all } from 'redux-saga/effects'

import InvalidFieldError from 'utils/errors/InvalidFieldError'

import {
  selectCustomAsset,
  selectDigitalAssetsItems,
} from 'store/stateSelectors'

import web3 from 'services/web3'

import {
  OPEN,
  CLOSE,
  SET_FIELD,
  START_ASSET_LOADING,
  clean,
  setField,
  setFieldError,
  clearFieldError,
  setAssetIsValid,
  startAssetLoading,
} from '../modules/customAsset'

const {
  getContractName,
  getContractSymbol,
  getContractDecimals,
} = web3

type RequestedAssetFields = {|
  decimals: number,
  name: string,
  symbol: string,
|}

function addressFieldSimpleCheck(contractAddress: Address) {
  const address = contractAddress.trim()

  // 1. check length
  if (address.length < 42) {
    throw new InvalidFieldError('address', i18n('routes.addCutomAsset.error.address.tooShort'))
  }

  // 2. check address field checksum
  if (!Keystore.isAddressValid(address)) {
    throw new InvalidFieldError('address', i18n('routes.addCutomAsset.error.address.invalid'))
  }
}

// -> to be moved to DigitalAssets saga
function* getDigitalAsset(contractAddress: Address): Saga<DigitalAsset> {
  const digitalAssets: DigitalAssets = yield select(selectDigitalAssetsItems)

  return digitalAssets.find(address => address === contractAddress)
}

/**
 * Make requests to ETH node.
 * Returns asset details or null if asset not ERC-20 compatible
 * 
 * @param {string} contractAddress 
 * @returns {null | RequestedAssetFields}
 */
function* requestAssetFieldsTask(contractAddress: Address): Saga<?RequestedAssetFields> {
  try {
    // make three parallel requests
    const { name, symbol, decimals } = yield all({
      name: call(getContractName, contractAddress),
      symbol: call(getContractSymbol, contractAddress),
      decimals: call(getContractDecimals, contractAddress),
    })

    if (name === '0x' || symbol === '0x') {
      return null
    }

    return {
      name,
      symbol,
      decimals, // decimals is BigNumber, get c
    }
  } catch (err) {
    // catch Web3 errors here, user should not to see it
    console.error(err)
    return null
  } finally {
    // in future, here there will cancel web3 requests logic
    // console.error('CANCEL request')
  }
}

/**
 * Request asset fields from ETH node
 * Emit startAssetLoading, setAssetIsValid events on success/fail
 * Cencels previous request on page close, or when new request required
 * 
 * @param {string} contractAddress
 * @returns {RequestedAssetFields}
 * @throws {InvalidFieldError}
 */
function* requestAssetFields(contractAddress: Address): Saga<?RequestedAssetFields> {
  // check if we are already requesting this address...
  const { requestedAddress }: ExtractReturn<typeof selectCustomAsset>
    = yield select(selectCustomAsset)

  if (requestedAddress === contractAddress) {
    // ...do nothing
    return null
  }

  // set loading, shows loader on address input, update requestedAddress
  yield put(startAssetLoading(contractAddress))

  // wait for result or cancel all
  const { result } = yield race({
    result: requestAssetFieldsTask(contractAddress),
    // cancel on close Add asset screen
    close: take(CLOSE),
    // cancel, when we are trying to request another contract
    restart: take(START_ASSET_LOADING),
  })

  if (result) {
    yield put(setAssetIsValid(true))
  } else {
    yield put(setAssetIsValid(false))
    throw new InvalidFieldError('address', i18n('routes.addCutomAsset.error.address.notERC20'))
  }

  return result
}

/**
 * Fires, when user changes fields on CustomAssetForm
 * Form validation here
 * Emit setField, setFieldError, clearFieldError, requestAssetFields events
 * 
 * @param action from setField method
 * @returns {undefined}
 */
function* onFieldChange(action: ExtractReturn<typeof setField>): Saga<void> {
  const { fieldName, value } = action.payload

  try {
    switch (fieldName) {
      /**
       * Address field validation
       * This input is avalable only in add asset page, in edit asset is is disabled
       */
      case 'address': {
        const contractAddress = value.trim()

        // 0. clear error when address is empty
        if (contractAddress === '') {
          yield put(clearFieldError('address'))
          break
        }

        // 1. simple checks
        addressFieldSimpleCheck(contractAddress)

        // 2. check if this asset already exists
        const foundAsset = yield* getDigitalAsset(contractAddress)
        if (foundAsset) {
          throw new InvalidFieldError('address', i18n('routes.addCutomAsset.error.address.exists'))
        }

        // 4. Make requests to eth node, enshure, that token is ERC20 compatible
        //    Request name, symbol, decimals fields from contract
        const assetFields = yield* requestAssetFields(contractAddress)

        // update another fields
        if (assetFields) {
          yield put(setField('name', assetFields.name))
          yield put(setField('symbol', assetFields.symbol))
          yield put(setField('decimals', assetFields.decimals))
        }

        break
      }

      // reserved for add, edit asset task
      // don't touch!!!

      // case 'name': {

      // }

      // case 'decimals': {

      // }

      // case 'symbol': {

      // }

      default:
        break
    }
  } catch (err) {
    if (err instanceof InvalidFieldError) {
      yield put(setFieldError(err.fieldName, err.message))
    } else {
      // uncaught error, here we should log this error
      // but now we just log this error under field
      yield put(setFieldError(fieldName, err.message))
    }
  }
}

function* customAssetAddOpen(): Saga<void> {
  yield put(clean())
}

export function* customAssetRootSaga(): Saga<void> {
  yield takeEvery(OPEN_CUSTOM_ASSET_ADD, customAssetAddOpen)
  yield takeEvery(SET_FIELD, onFieldChange)
}
