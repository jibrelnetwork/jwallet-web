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
  deleteCustomAsset,
  deleteAssetRequest,
  DELETE_CUSTOM_ASSET,
} from '../modules/digitalAssets'

function* deleteCustomAssetSaga(action: ExtractReturn<typeof deleteCustomAsset>): Saga<void> {
  const { assetAddress } = action.payload

  // check, that this asset is custom and exists
  const assets: DigitalAssets = yield select(selectDigitalAssets)
  if (assets && assets[assetAddress] && assets[assetAddress].isCustom) {
    yield put(deleteAssetRequest(assetAddress))
  }
}

function* initDigitalAssetsSaga(): Saga<void> {
  const existingAssets: DigitalAssets = yield select(selectDigitalAssets)
  const haveAssetsInStorage = Object.keys(existingAssets).length > 0

  if (!haveAssetsInStorage) {
    const allAssets = assetsData.main.reduce((result, asset) => ({
      ...result,
      [asset.address]: asset,
    }), {})

    const allAssetsWithETH = {
      [assetsData.ethereum.address]: assetsData.ethereum,
      ...allAssets,
    }

    yield put(setInitialItems(allAssetsWithETH))
  }
}

export function* digitalAssetsRootSaga(): Saga<void> {
  yield takeEvery(OPEN_ASIDE_LAYOUT, initDigitalAssetsSaga)
  yield takeEvery(DELETE_CUSTOM_ASSET, deleteCustomAssetSaga)
}
