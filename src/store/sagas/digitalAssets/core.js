// @flow strict

import { delay } from 'redux-saga'

import {
  put,
  call,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects'

import {
  addETHAsset,
  mergeDigitalAssets,
} from 'utils/digitalAssets'

import {
  selectDigitalAsset,
  selectDigitalAssetsItems,
} from 'store/selectors/digitalAssets'

import * as blocks from 'store/modules/blocks'
import * as ticker from 'store/modules/ticker'
import * as digitalAssets from 'store/modules/digitalAssets'

function* init(): Saga<void> {
  const items: ExtractReturn<typeof selectDigitalAssetsItems> =
    yield select(selectDigitalAssetsItems)

  const mergedItems: DigitalAssets = yield call(
    mergeDigitalAssets,
    items,
  )

  const itemsWithETH: DigitalAssets = yield call(
    addETHAsset,
    mergedItems,
  )

  yield put(digitalAssets.setInitialItems(itemsWithETH))
}

function* setAssetIsActive(): Saga<void> {
  yield delay(10)
  yield put(blocks.syncRestart())
  yield put(ticker.syncRestart())
}

function* deleteCustomAsset(
  action: ExtractReturn<typeof digitalAssets.deleteCustomAsset>,
): Saga<void> {
  const { assetAddress } = action.payload

  const foundAsset: ExtractReturn<typeof selectDigitalAssetsItems> = yield select(
    selectDigitalAsset,
    assetAddress,
  )

  if (!(foundAsset && foundAsset.isCustom)) {
    return
  }

  yield put(digitalAssets.deleteAssetRequest(assetAddress))
}

export function* digitalAssetsRootSaga(): Saga<void> {
  yield takeEvery(
    digitalAssets.INIT,
    init,
  )

  yield takeLatest(
    digitalAssets.SET_ASSET_IS_ACTIVE,
    setAssetIsActive,
  )

  yield takeEvery(
    digitalAssets.DELETE_CUSTOM_ASSET,
    deleteCustomAsset,
  )
}
