// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import walletsWorker from 'workers/wallets'
import getWallet from 'utils/wallets/getWallet'
import { selectWallets } from 'store/stateSelectors'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsDelete from '../modules/walletsDelete'

function* openView(action: ExtractReturn<typeof walletsDelete.openView>): Saga<void> {
  yield put(wallets.clean())
  yield put(walletsDelete.clean())

  const { persist }: WalletsState = yield select(selectWallets)
  const isFound: boolean = !!getWallet(persist.items, action.payload.walletId)

  if (!isFound) {
    yield put(push('/wallets'))
  }
}

function* deleteRequest(action: ExtractReturn<typeof walletsDelete.deleteRequest>): Saga<void> {
  const { items, walletId } = action.payload

  yield put(wallets.setIsLoading(true))

  walletsWorker.deleteRequest(items, walletId)
}

function* deleteError(): Saga<void> {
  yield put(wallets.setIsLoading(false))
  yield put(push('/error'))
}

function* deleteSuccess(action: ExtractReturn<typeof walletsDelete.deleteSuccess>): Saga<void> {
  yield put(wallets.setWalletsItems(action.payload.items))
  yield put(wallets.setIsLoading(false))

  const isEmptyWallets: boolean = (action.payload.items.length === 0)

  yield put(push(isEmptyWallets ? '/wallets/start' : '/wallets'))
}

export function* walletsDeleteRootSaga(): Saga<void> {
  yield takeEvery(walletsDelete.OPEN_VIEW, openView)
  yield takeEvery(walletsDelete.DELETE_ERROR, deleteError)
  yield takeEvery(walletsDelete.DELETE_SUCCESS, deleteSuccess)
  yield takeEvery(walletsDelete.DELETE_REQUEST, deleteRequest)
}
