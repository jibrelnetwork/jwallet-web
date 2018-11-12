// @flow

import { select, put, takeEvery } from 'redux-saga/effects'

import assetsData from 'data/assets'

import {
  selectDigitalAssets,
} from 'store/stateSelectors'

import {
  OPEN_ASIDE_LAYOUT,
} from 'routes/modules'

import {
  setInitialItems,
} from '../modules/digitalAssets'

function* initDigitalAssets(): Saga<void> {
  const existingAssets: DigitalAssets = yield select(selectDigitalAssets)
  const haveAssetsInStorage = Object.keys(existingAssets).length > 0

  if (!haveAssetsInStorage) {
    const allAssets = assetsData.main.reduce((result, asset) => ({
      ...result,
      [asset.address]: asset,
    }), {})

    yield put(setInitialItems(allAssets))
  }
}

export function* digitalAssetsRootSaga(): Saga<void> {
  yield takeEvery(OPEN_ASIDE_LAYOUT, initDigitalAssets)
}
