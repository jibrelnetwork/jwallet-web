// @flow

import { put, takeEvery } from 'redux-saga/effects'

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

function* clean(): Saga<void> {
  yield put(wallets.clean())
  yield put(walletsDelete.clean())
}

export function* walletsDeleteRootSaga(): Saga<void> {
  yield takeEvery(walletsDelete.OPEN_VIEW, clean)
  yield takeEvery(walletsDelete.DELETE_ERROR, deleteError)
  yield takeEvery(walletsDelete.DELETE_SUCCESS, deleteSuccess)
  yield takeEvery(walletsDelete.DELETE_REQUEST, deleteRequest)
}
