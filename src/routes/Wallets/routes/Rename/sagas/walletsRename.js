// @flow

import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import walletsWorker from 'workers/wallets'
import { selectWallets } from 'store/stateSelectors'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsRename from '../modules/walletsRename'

function* openView(action: ExtractReturn<typeof walletsRename.openView>): Saga<void> {
  const { walletId } = action.payload
  const { items } = yield select(selectWallets)
  const foundWallet: ?Wallet = items.find((wallet: Wallet): boolean => (wallet.id === walletId))

  if (foundWallet) {
    yield put(wallets.changeNameInput(foundWallet.name))
  }
}

function* renameRequest(action: ExtractReturn<typeof walletsRename.renameRequest>): Saga<void> {
  const {
    items,
    name,
    walletId,
  } = action.payload

  yield put(wallets.setIsLoading(true))

  walletsWorker.renameRequest(items, name, walletId)
}

function* renameError(action: { payload: Error }): Saga<void> {
  yield put(wallets.setInvalidField('name', action.payload.message))
  yield put(wallets.setIsLoading(false))
}

function* renameSuccess(action: ExtractReturn<typeof walletsRename.renameSuccess>): Saga<void> {
  yield put(wallets.setWalletsItems(action.payload.items))
  yield put(wallets.setIsLoading(false))
}

function* closeView(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(walletsRename.clean())
}

function* clean(): Saga<void> {
  yield put(wallets.clean())
}

export function* walletsRenameRootSaga(): Saga<void> {
  yield takeEvery(walletsRename.CLEAN, clean)
  yield takeEvery(walletsRename.OPEN_VIEW, openView)
  yield takeEvery(walletsRename.CLOSE_VIEW, closeView)
  yield takeEvery(walletsRename.RENAME_ERROR, renameError)
  yield takeEvery(walletsRename.RENAME_SUCCESS, renameSuccess)
  yield takeEvery(walletsRename.RENAME_REQUEST, renameRequest)
}
