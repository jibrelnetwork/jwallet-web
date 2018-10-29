// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import { selectWalletsPersist } from 'store/stateSelectors'
import { getWallet, checkMnemonicType } from 'utils/wallets'

import * as wallets from '../modules/wallets'

function* openView(): Saga<void> {
  yield put(wallets.clean())
  yield put(wallets.setActiveWallet(null))

  const { items }: WalletsPersist = yield select(selectWalletsPersist)

  if (!items.length) {
    yield put(push('/wallets/start'))
  }
}

function* setActiveWallet(action: ExtractReturn<typeof wallets.setActiveWallet>): Saga<void> {
  const { activeWalletId } = action.payload

  if (!activeWalletId) {
    return
  }

  const { items }: WalletsPersist = yield select(selectWalletsPersist)
  const wallet: ?Wallet = getWallet(items, activeWalletId)
  const isMnemonicWallet: boolean = !!wallet && checkMnemonicType(wallet.type)

  yield put(push(isMnemonicWallet ? '/wallets/addresses' : '/wallets'))
}

export function* walletsRootSaga(): Saga<void> {
  yield takeEvery(wallets.OPEN_VIEW, openView)
  yield takeEvery(wallets.SET_ACTIVE_WALLET, setActiveWallet)
}
