// @flow

import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import InvalidFieldError from 'utils/errors/InvalidFieldError'
import { keystore } from 'services'
import { selectWalletId, selectChangeWalletPassword } from 'store/stateSelectors'

import {
  CHANGE_PASSWORD,
  CLOSE,
  changePasswordSuccess,
  changePasswordError,
  clean,
} from '../modules/changeWalletPassword'

function* closeChangeWalletPassword(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* changeWalletPassword(): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    return
  }

  try {
    const data: ChangeWalletPasswordData = yield select(selectChangeWalletPassword)
    const { customType }: Wallet = keystore.getWallet(walletId)

    checkPasswordConfirmation(data)
    setPassword(data, walletId)

    yield put(changePasswordSuccess(customType))
    yield closeChangeWalletPassword()
  } catch (err) {
    yield put(changePasswordError(err))
  }
}

function checkPasswordConfirmation(data: ChangeWalletPasswordData) {
  if (data.newPassword !== data.confirmPassword) {
    throw new InvalidFieldError('confirmPassword', i18n('general.error.confirmPassword.notMatched'))
  }
}

function setPassword(data: ChangeWalletPasswordData, walletId: WalletId) {
  try {
    keystore.setPassword(data.password, data.newPassword, walletId)
  } catch (err) {
    throw new InvalidFieldError('password', i18n('general.error.password.invalid'))
  }
}

export function* watchChangeWalletPasswordClose(): Saga<void> {
  yield takeEvery(CLOSE, closeChangeWalletPassword)
}

export function* watchChangeWalletPassword(): Saga<void> {
  yield takeEvery(CHANGE_PASSWORD, changeWalletPassword)
}
