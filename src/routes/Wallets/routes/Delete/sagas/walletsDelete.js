// @flow

import { push } from 'react-router-redux'

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import { selectWalletsItems } from 'store/selectors/wallets'

import {
  getWallet,
  removeWallet,
} from 'utils/wallets'

import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsDelete from '../modules/walletsDelete'

function* openView(action: ExtractReturn<typeof walletsDelete.openView>): Saga<void> {
  yield put(wallets.clean())

  const items: Wallets = yield select(selectWalletsItems)

  try {
    getWallet(items, action.payload.walletId)
  } catch (err) {
    yield put(push('/wallets'))
  }
}

function* remove(action: ExtractReturn<typeof walletsDelete.remove>): Saga<void> {
  const { items, walletId } = action.payload

  yield put(wallets.setIsLoading(true))

  const itemsNew: Wallets = removeWallet(items, walletId)
  const isEmptyWallets: boolean = !itemsNew.length

  if (isEmptyWallets) {
    yield put(wallets.setWallets({
      items: [],
      internalKey: null,
      passwordOptions: null,
    }))
  } else {
    yield put(wallets.setWalletsItems(itemsNew))
  }

  yield put(push(isEmptyWallets ? '/wallets/start' : '/wallets'))
}

export function* walletsDeleteRootSaga(): Saga<void> {
  yield takeEvery(walletsDelete.REMOVE, remove)
  yield takeEvery(walletsDelete.OPEN_VIEW, openView)
}
