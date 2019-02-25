// @flow

import {
  put,
  takeEvery,
} from 'redux-saga/effects'

import * as core from 'store/modules/core'
import * as blocks from 'store/modules/blocks'
import * as ticker from 'store/modules/ticker'
import * as digitalAssets from 'store/modules/digitalAssets'

function* openMenuLayout(): Saga<void> {
  yield put(blocks.syncStart())
  yield put(ticker.syncStart())
  yield put(digitalAssets.init())
}

function* closeMenuLayout(): Saga<void> {
  yield put(blocks.syncStop())
  yield put(ticker.syncStop())
}

export function* coreRootSaga(): Saga<void> {
  yield takeEvery(core.OPEN_MENU_LAYOUT, openMenuLayout)
  yield takeEvery(core.CLOSE_MENU_LAYOUT, closeMenuLayout)
}
