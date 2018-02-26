// @flow

import { put, select, takeEvery } from 'redux-saga/effects'

import { keystore } from 'services'
import { selectWalletId } from 'store/stateSelectors'

import {
  OPEN,
  REMOVE,
  close,
  removeSuccess,
  removeError,
} from '../modules/removeWallet'

function* openRemoveWallet(): Saga<void> {
  try {
    const walletId: WalletId = yield select(selectWalletId)
    keystore.getWallet(walletId)
  } catch (err) {
    // TODO: handle this case in appropriate way
    // console.error(err)
    yield put(close())
  }
}

function* removeWallet(): Saga<void> {
  try {
    const walletId = yield select(selectWalletId)
    const { customType }: Wallet = keystore.removeWallet(walletId)
    yield put(removeSuccess(customType))
  } catch (err) {
    yield put(removeError(err))
  }
}

export function* watchOpenRemoveWallet(): Saga<void> {
  yield takeEvery(OPEN, openRemoveWallet)
}

export function* watchRemoveWallet(): Saga<void> {
  yield takeEvery(REMOVE, removeWallet)
}
