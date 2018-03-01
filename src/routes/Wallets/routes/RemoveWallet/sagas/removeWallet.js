// @flow

import { put, select, takeEvery } from 'redux-saga/effects'

import keystore from 'services/keystore'
import { selectWalletId } from 'store/stateSelectors'

import {
  OPEN,
  REMOVE,
  close,
  removeSuccess,
  removeError,
} from '../modules/removeWallet'

function* openRemoveWallet(): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    yield put(close())

    return
  }

  try {
    keystore.getWallet(walletId)
  } catch (err) {
    // TODO: handle this case in appropriate way
    // console.error(err)
    yield put(close())
  }
}

function* removeWallet(): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    yield put(close())

    return
  }

  try {
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
