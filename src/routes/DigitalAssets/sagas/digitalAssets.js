// @flow

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import assetsData from 'data/assets'

import {
  selectDigitalAsset,
  selectDigitalAssetsItems,
} from 'store/selectors/digitalAssets'

import * as blocks from 'routes/modules/blocks'

import * as digitalAssets from '../modules/digitalAssets'

function* init(): Saga<void> {
  const existingAssets: ExtractReturn<typeof selectDigitalAssetsItems> =
    yield select(selectDigitalAssetsItems)

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

    yield put(digitalAssets.setInitialItems(allAssetsWithETH))
  }
}

function* setAssetIsActive(): Saga<void> {
  yield put(blocks.syncRestart())
}

function* deleteCustomAsset(
  action: ExtractReturn<typeof digitalAssets.deleteCustomAsset>,
): Saga<void> {
  const { assetAddress } = action.payload

  const foundAsset: ExtractReturn<typeof selectDigitalAssetsItems> =
    yield select(selectDigitalAsset, assetAddress)

  if (!(foundAsset && foundAsset.isCustom)) {
    return
  }

  yield put(digitalAssets.deleteAssetRequest(assetAddress))
  yield put(blocks.syncRestart())
}

export function* digitalAssetsRootSaga(): Saga<void> {
  yield takeEvery(digitalAssets.INIT, init)
  yield takeEvery(digitalAssets.SET_ASSET_IS_ACTIVE, setAssetIsActive)
  yield takeEvery(digitalAssets.DELETE_CUSTOM_ASSET, deleteCustomAsset)
}
