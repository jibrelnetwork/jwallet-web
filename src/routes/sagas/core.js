// @flow

import {
  put,
  takeEvery,
} from 'redux-saga/effects'

import * as core from 'routes/modules/core'
import * as blocks from 'routes/modules/blocks'

function* openMenuLayout(): Saga<void> {
  yield put(blocks.syncStart())
}

function* closeMenuLayout(): Saga<void> {
  yield put(blocks.syncStop())
}

export function* coreRootSaga(): Saga<void> {
  yield takeEvery(core.OPEN_MENU_LAYOUT, openMenuLayout)
  yield takeEvery(core.CLOSE_MENU_LAYOUT, closeMenuLayout)
}
