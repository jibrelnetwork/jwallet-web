// @flow

import Promise from 'bluebird'
import keystore from '@jibrelnetwork/jwallet-web-keystore'
import { put, select, takeEvery, take, race, call, all } from 'redux-saga/effects'

import InvalidFieldError from 'utils/errors/InvalidFieldError'

import {
  selectCustomAsset,
  selectDigitalAssetsItems,
} from 'store/stateSelectors'

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
} from '../modules/addAsset'

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

const NODE_EMPTY_VALUE = '0x'

function* getDigitalAsset(contractAddress: Address): Saga<DigitalAsset> {
  const digitalAssets: DigitalAssets = yield select(selectDigitalAssetsItems)

  return digitalAssets.find(address => address === contractAddress)
}

/**
 * Request not required field from contract
 *
 * @param {Function} contractMethod
 * @param {Address} contractAddress
 */
function* requestAssetField(
  contractMethod: Function,
  contractAddress: Address
): Saga<string | number | void> {
  try {
    const result = yield call(contractMethod, contractAddress)
    if (result === NODE_EMPTY_VALUE) {
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
  yield put(clearFieldError('name'))
  yield put(clearFieldError('symbol'))
  yield put(clearFieldError('decimals'))
}

/**
 * Fires, when user changes fields on CustomAssetForm
 *
 * @param action from setField method
 * @returns {undefined}
 */
function* onFieldChange(action: ExtractReturn<typeof setField>): Saga<void> {
  const { fieldName, value } = action.payload

  /**
   * Address field validation
   * This input is avalable only in add asset page, in edit asset is is disabled
   */
  if (fieldName === 'address') {
    const contractAddress = value.trim()

    // check if we are already requesting this address...
    const { requestedAddress }: ExtractReturn<typeof selectCustomAsset>
      = yield select(selectCustomAsset)

    if (keystore.checkAddressValid(contractAddress) && requestedAddress !== contractAddress) {
      yield* clearFields()
      yield put(clearFieldError('address'))

      try {
        // Check if this asset already exists
        const foundAsset = yield* getDigitalAsset(contractAddress)
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
  }
}

function* addAssetOpen(): Saga<void> {
  yield put(clean())
}

export function* addAssetRootSaga(): Saga<void> {
  yield takeEvery(OPEN_VIEW, addAssetOpen)
  yield takeEvery(SET_FIELD, onFieldChange)
}
