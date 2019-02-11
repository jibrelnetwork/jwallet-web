// @flow

import {
  put,
  takeEvery,
} from 'redux-saga/effects'

import * as core from 'routes/modules/core'
import * as blocks from 'routes/modules/blocks'
import * as ticker from 'routes/modules/ticker'
import * as digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'

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
