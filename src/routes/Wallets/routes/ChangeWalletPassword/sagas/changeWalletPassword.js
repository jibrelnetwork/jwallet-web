// @flow

import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { keystore } from 'services'
import { InvalidFieldError } from 'utils/errors'
import { selectWalletId, selectChangeWalletPassword } from 'store/stateSelectors'

import {
  CHANGE_PASSWORD,
  OPEN,
  CLOSE,
  close,
  changePasswordSuccess,
  changePasswordError,
  clean,
} from '../modules/changeWalletPassword'

function* openChangeWalletPassword(): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    yield put(close())

    return
  }

  try {
    const { isReadOnly }: Wallet = keystore.getWallet(walletId)

    if (!isReadOnly) {
      return
    }

    yield put(close())
  } catch (err) {
    // TODO: handle this case in appropriate way
    // console.error(err)
    yield put(close())
  }
}

function* closeChangeWalletPassword(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* changeWalletPassword(): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    yield put(close())

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

export function* watchOpenChangeWalletPassword(): Saga<void> {
  yield takeEvery(OPEN, openChangeWalletPassword)
}

export function* watchCloseChangeWalletPassword(): Saga<void> {
  yield takeEvery(CLOSE, closeChangeWalletPassword)
}

export function* watchChangeWalletPassword(): Saga<void> {
  yield takeEvery(CHANGE_PASSWORD, changeWalletPassword)
}
