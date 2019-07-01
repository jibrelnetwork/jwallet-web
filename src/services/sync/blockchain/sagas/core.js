// @flow

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import * as core from '../modules/core'
import * as config from '../modules/config'
import * as blocks from '../modules/blocks'
import {
  selectCurrentAddress,
  selectCurrentNetworkId,
} from '../selectors/config'

import { init } from '../db'

function* initDB(): Saga<void> {
  const networkId = yield select(selectCurrentNetworkId)
  const ownerAddress = yield select(selectCurrentAddress)

  if (!networkId || !ownerAddress) {
    throw new Error('You need to configure both networkId and address to create DB connection')
  }

  const db = yield init(`${networkId}_${ownerAddress}`)

  yield put(config.setDBInstance(db))
}

function* startHistorySync(): Saga<void> {
  yield initDB()
  yield put(blocks.syncStart())
}

function* stopHistorySync(): Saga<void> {
  yield put(blocks.syncStop())
}

export function* coreRootSaga(): Saga<void> {
  yield takeEvery(core.SYNC_START, startHistorySync)
  yield takeEvery(core.SYNC_STOP, stopHistorySync)
}
