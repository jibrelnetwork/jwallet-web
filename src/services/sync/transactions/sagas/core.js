// @flow

import {
  put,
  takeEvery,
} from 'redux-saga/effects'

import * as core from '../modules/core'
import * as blocks from '../modules/blocks'

function* startHistorySync(): Saga<void> {
  yield put(blocks.syncStart())
}

function* stopHistorySync(): Saga<void> {
  yield put(blocks.syncStop())
}

export function* coreRootSaga(): Saga<void> {
  yield takeEvery(core.SYNC_START, startHistorySync)
  yield takeEvery(core.SYNC_STOP, stopHistorySync)
}
