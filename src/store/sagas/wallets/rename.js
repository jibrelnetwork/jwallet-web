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
  updateWallet,
  checkWalletUniqueness,
} from 'utils/wallets'

import * as wallets from 'store/modules/wallets'
import * as walletsRename from 'store/modules/walletsRename'

function* openView(action: ExtractReturn<typeof walletsRename.openView>): Saga<void> {
  const items: Wallets = yield select(selectWalletsItems)

  try {
    getWallet(items, action.payload.walletId)
  } catch (err) {
    yield put(router5Actions('Wallets'))
  }
}

function* rename(action: ExtractReturn<typeof walletsRename.rename>): Saga<void> {
  const {
    items,
    name,
    walletId,
  } = action.payload

  if (!name) {
    return
  }

  const foundWallet: Wallet = getWallet(items, walletId)

  if (foundWallet.name === name) {
    return
  }

  try {
    checkWalletUniqueness(items, name, 'name')
    const itemsNew = updateWallet(items, walletId, { name })

    yield put(wallets.setWalletsItems(itemsNew))
    yield put(router5Actions.navigateTo('Wallets'))
  } catch (err) {
    console.error(err.message)
  }
}

export function* walletsRenameRootSaga(): Saga<void> {
  yield takeEvery(walletsRename.RENAME, rename)
  yield takeEvery(walletsRename.OPEN_VIEW, openView)
}
