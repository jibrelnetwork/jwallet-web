// @flow
// import { delay } from 'redux-saga'

import { select, put, takeEvery } from 'redux-saga/effects'

import assetsData from 'data/assets'

import {
  selectDigitalAssetsItems,
} from 'store/stateSelectors'

import {
  OPEN_VIEW,
  setInitialItems,
} from '../modules/digitalAssets'

function* openView(): Saga<void> {
  console.log('openView')
  const existingAssets: DigitalAssets = yield select(selectDigitalAssetsItems)
  const haveAssetsInStorage = Object.keys(existingAssets).length > 0

  if (!haveAssetsInStorage) {
    const allAssets = assetsData.main.reduce((result, asset) => ({
      ...result,
      [asset.address]: asset,
    }), {})
    // console.log(allAssets)

    yield put(setInitialItems(allAssets))
  }
}

export function* digitalAssetsRootSaga(): Saga<void> {
  console.log('digitalAssetsRootSaga')
  yield takeEvery(OPEN_VIEW, openView)
}
