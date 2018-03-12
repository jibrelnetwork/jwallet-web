// @flow

import { append } from 'ramda'
import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import validate from 'services/validate'
import { selectDigitalAssetsItems, selectAddCustomAsset } from 'store/stateSelectors'

import {
  ADD,
  CLOSE,
  addSuccess,
  addError,
  clean,
} from '../modules/addCustomAsset'

function* closeAddCustomAsset(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* addCustomAsset(): Saga<void> {
  try {
    const digitalAssets: DigitalAssets = yield select(selectDigitalAssetsItems)
    const customAssetData: CustomAssetData = yield select(selectAddCustomAsset)

    validate.customAssetData(customAssetData, digitalAssets)
    const updatedAssets: DigitalAssets = append(getCustomAssetData(customAssetData), digitalAssets)

    yield put(addSuccess(updatedAssets))
  } catch (err) {
    yield put(addError(err))
  }
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
  }
}

export function* watchAddCustomAssetClose(): Saga<void> {
  yield takeEvery(CLOSE, closeAddCustomAsset)
}

export function* watchAddCustomAssetAdd(): Saga<void> {
  yield takeEvery(ADD, addCustomAsset)
}
