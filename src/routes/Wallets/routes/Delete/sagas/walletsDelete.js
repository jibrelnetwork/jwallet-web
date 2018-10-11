// @flow

import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

import config from 'config'
import walletsWorker from 'workers/wallets'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsDelete from '../modules/walletsDelete'

function* deleteRequest(action: ExtractReturn<typeof walletsDelete.deleteRequest>): Saga<void> {
  const { items, walletId } = action.payload

  yield put(wallets.setIsLoading(true))

  walletsWorker.deleteRequest(items, walletId)
}

function* deleteError(): Saga<void> {
  yield put(wallets.setIsLoading(false))
}

function* deleteSuccess(action: ExtractReturn<typeof walletsDelete.deleteSuccess>): Saga<void> {
  yield put(wallets.setWalletsItems(action.payload.items))
  yield put(wallets.setIsLoading(false))
}

function* closeView(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(walletsDelete.clean())
}

function* clean(): Saga<void> {
  yield put(wallets.clean())
}

export function* walletsDeleteRootSaga(): Saga<void> {
  yield takeEvery(walletsDelete.CLEAN, clean)
  yield takeEvery(walletsDelete.CLOSE_VIEW, closeView)
  yield takeEvery(walletsDelete.DELETE_ERROR, deleteError)
  yield takeEvery(walletsDelete.DELETE_SUCCESS, deleteSuccess)
  yield takeEvery(walletsDelete.DELETE_REQUEST, deleteRequest)
}
