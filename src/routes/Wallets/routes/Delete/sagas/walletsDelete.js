// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import keystore from 'services/keystore'
import getWallet from 'utils/wallets/getWallet'
import { selectWalletsPersist } from 'store/stateSelectors'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsDelete from '../modules/walletsDelete'

function* openView(action: ExtractReturn<typeof walletsDelete.openView>): Saga<void> {
  yield put(wallets.clean())

  const { items }: WalletsPersist = yield select(selectWalletsPersist)
  const isFound: boolean = !!getWallet(items, action.payload.walletId)

  if (!isFound) {
    yield put(push('/wallets'))
  }
}

function* remove(action: ExtractReturn<typeof walletsDelete.remove>): Saga<void> {
  const { items, walletId } = action.payload

  yield put(wallets.setIsLoading(true))

  const itemsNew: Wallets = keystore.removeWallet(items, walletId)
  yield put(wallets.setWalletsItems(itemsNew))

  const isEmptyWallets: boolean = (itemsNew.length === 0)
  yield put(push(isEmptyWallets ? '/wallets/start' : '/wallets'))
}

export function* walletsDeleteRootSaga(): Saga<void> {
  yield takeEvery(walletsDelete.REMOVE, remove)
  yield takeEvery(walletsDelete.OPEN_VIEW, openView)
}
