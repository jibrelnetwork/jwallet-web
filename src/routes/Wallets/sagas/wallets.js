// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import { selectWallets } from 'store/stateSelectors'
import { getWallet, checkMnemonicType } from 'utils/wallets'

import * as wallets from '../modules/wallets'

function* openView(): Saga<void> {
  yield put(wallets.clean())
  yield put(wallets.setActiveWallet(null))

  const { persist }: WalletsState = yield select(selectWallets)

  if (!persist.items.length) {
    yield put(push('/wallets/start'))
  }
}

function* setActiveWallet(action: ExtractReturn<typeof wallets.setActiveWallet>): Saga<void> {
  const { activeWalletId } = action.payload

  if (!activeWalletId) {
    return
  }

  const { persist }: WalletsState = yield select(selectWallets)
  const wallet: ?Wallet = getWallet(persist.items, activeWalletId)
  const isMnemonicWallet: boolean = !!wallet && checkMnemonicType(wallet.type)

  yield put(push(isMnemonicWallet ? '/wallets/addresses' : '/wallets'))
}

export function* walletsRootSaga(): Saga<void> {
  yield takeEvery(wallets.OPEN_VIEW, openView)
  yield takeEvery(wallets.SET_ACTIVE_WALLET, setActiveWallet)
}
