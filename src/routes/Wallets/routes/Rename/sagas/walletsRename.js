// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import keystore from 'services/keystore'
import getWallet from 'utils/wallets/getWallet'
import { selectWallets } from 'store/stateSelectors'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsRename from '../modules/walletsRename'

function* openView(action: ExtractReturn<typeof walletsRename.openView>): Saga<void> {
  yield put(wallets.clean())

  const { walletId } = action.payload
  const { persist }: WalletsState = yield select(selectWallets)
  const foundWallet: ?Wallet = getWallet(persist.items, walletId)

  if (foundWallet) {
    yield put(wallets.changeNameInput(foundWallet.name))
  } else {
    yield put(push('/wallets'))
  }
}

function* rename(action: ExtractReturn<typeof walletsRename.rename>): Saga<void> {
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

  try {
    keystore.checkWalletUniqueness(items, name, 'name')
    const itemsNew = keystore.updateWallet(items, walletId, { name })

    yield put(wallets.setWalletsItems(itemsNew))
    yield put(push('/wallets'))
  } catch (err) {
    yield put(wallets.setInvalidField('name', err.message))
  }
}

export function* walletsRenameRootSaga(): Saga<void> {
  yield takeEvery(walletsRename.RENAME, rename)
  yield takeEvery(walletsRename.OPEN_VIEW, openView)
}
