// @flow

import { actions as router5Actions } from 'redux-router5'

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

import * as wallets from 'store/modules/wallets'
import * as walletsDelete from 'store/modules/walletsDelete'

function* openView(action: ExtractReturn<typeof walletsDelete.openView>): Saga<void> {
  const items: Wallets = yield select(selectWalletsItems)

  try {
    getWallet(items, action.payload.walletId)
  } catch (err) {
    yield put(router5Actions.navigateTo('Wallets'))
  }
}

function* remove(action: ExtractReturn<typeof walletsDelete.remove>): Saga<void> {
  const {
    items,
    walletId,
  } = action.payload

  const itemsNew: Wallets = removeWallet(items, walletId)
  const isEmptyWallets: boolean = !itemsNew.length

  if (isEmptyWallets) {
    //
  } else {
    yield put(wallets.setWalletsItems(itemsNew))
  }

  yield put(router5Actions.navigateTo('Wallets'))
}

export function* walletsDeleteRootSaga(): Saga<void> {
  yield takeEvery(walletsDelete.REMOVE, remove)
  yield takeEvery(walletsDelete.OPEN_VIEW, openView)
}
