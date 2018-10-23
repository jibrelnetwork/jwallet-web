// @flow

import { put, select, takeEvery } from 'redux-saga/effects'

import walletsWorker from 'workers/wallets'
import getWallet from 'utils/wallets/getWallet'
import { selectWallets } from 'store/stateSelectors'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsRename from '../modules/walletsRename'

function* openView(action: ExtractReturn<typeof walletsRename.openView>): Saga<void> {
  yield* clean()

  const { walletId } = action.payload
  const { items } = yield select(selectWallets)
  const foundWallet: ?Wallet = getWallet(items, walletId)

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

  if (!name) {
    yield put(wallets.setInvalidField('name', 'Wallet name can\'t be empty'))

    return
  }

  const foundWallet: ?Wallet = getWallet(items, walletId)

  if (foundWallet && (foundWallet.name === name)) {
    yield put(wallets.setInvalidField('name', 'Wallet name should be changed'))

    return
  }

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

function* clean(): Saga<void> {
  yield put(wallets.clean())
  yield put(walletsRename.clean())
}

export function* walletsRenameRootSaga(): Saga<void> {
  yield takeEvery(walletsRename.OPEN_VIEW, openView)
  yield takeEvery(walletsRename.RENAME_ERROR, renameError)
  yield takeEvery(walletsRename.RENAME_SUCCESS, renameSuccess)
  yield takeEvery(walletsRename.RENAME_REQUEST, renameRequest)
}
