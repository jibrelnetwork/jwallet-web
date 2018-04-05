// @flow

import { put, select, takeEvery } from 'redux-saga/effects'

import keystore from 'services/keystore'
import InvalidFieldError from 'utils/errors/InvalidFieldError'
import { selectWalletId } from 'store/stateSelectors'

import {
  REMOVE,
  removeSuccess,
  removeError,
} from '../modules/removeWallet'

function* removeWallet(): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    return
  }

  try {
    const { customType }: Wallet = keystore.removeWallet(walletId)
    yield put(removeSuccess(customType))
  } catch (err) {
    const passwordError: InvalidFieldError = new InvalidFieldError('password', err.message)
    yield put(removeError(passwordError))
  }
}

export function* watchRemoveWallet(): Saga<void> {
  yield takeEvery(REMOVE, removeWallet)
}
