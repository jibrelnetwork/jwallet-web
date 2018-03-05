// @flow

import { append } from 'ramda'
import { put, select, takeEvery } from 'redux-saga/effects'

import { gtm, validate } from 'services'

import { CURRENCIES_SET } from 'routes/JWallet/modules/currencies'
import { SET_INVALID_FIELD, CLEAN, ADD } from '../modules/addCustomAsset'

function selectDigitalAssetsItems(state: { currencies: { items: DigitalAssets } }): DigitalAssets {
  return state.currencies.items
}

function selectCustomAssetData(state: { addCustomAsset: CustomAssetData }): CustomAssetData {
  return state.addCustomAsset
}

function* onAddCustomAsset(): Saga<void> {
  try {
    const digitalAssets: DigitalAssets = yield select(selectDigitalAssetsItems)
    const customAssetData: CustomAssetData = yield select(selectCustomAssetData)

    validate.customAssetData(customAssetData, digitalAssets)

    yield put({
      type: CURRENCIES_SET,
      items: append(getCustomAssetData(customAssetData), digitalAssets),
    })

    yield onAddCustomAssetSuccess()
  } catch (err) {
    yield onAddCustomAssetError(err)
  }
}

function* onAddCustomAssetSuccess() {
  gtm.pushAddCustomToken()
  yield put({ type: CLEAN })
}

function* onAddCustomAssetError(err: { fieldName: string, message: string }) {
  const { fieldName, message }: { fieldName: string, message: string } = err
  yield put({ type: SET_INVALID_FIELD, fieldName, message })
}

function getCustomAssetData(customAssetData: CustomAssetData): DigitalAsset {
  const { name, symbol, address, decimals }: CustomAssetData = customAssetData

  return {
    name,
    symbol,
    address,
    decimals: parseInt(decimals, 10) || 0,
    isActive: true,
    isCustom: true,
    isLicensed: false,
    isAuthRequired: false,
  }
}

export function* watchAddCustomAsset(): Saga<void> {
  yield takeEvery(ADD, onAddCustomAsset)
}
