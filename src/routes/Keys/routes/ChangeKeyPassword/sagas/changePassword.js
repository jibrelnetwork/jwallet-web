// @flow

import { pick } from 'ramda'
import { put, select, takeEvery } from 'redux-saga/effects'

import { gtm, storage, keystore } from 'services'
import { selectCurrentKeyId } from 'store/stateSelectors'

import { SET_INVALID_FIELD, CHANGE } from '../modules/changePassword'

declare type Passwords = { password: string, newPassword: string, confirmPassword: string }

function selectChangePassword(state: { changePassword: Passwords }): Passwords {
  return pick(['password', 'newPassword', 'confirmPassword'], state.changePassword)
}

function* onChangePassword(): Saga<void> {
  const walletId = yield select(selectCurrentKeyId)
  const { password, newPassword, confirmPassword }: Passwords = yield select(selectChangePassword)

  if (newPassword !== confirmPassword) {
    yield onPasswordConfirmationError()

    return
  }

  try {
    keystore.setPassword(password, newPassword, walletId)
    onChangePasswordSuccess()
  } catch (err) {
    yield onChangePasswordError()
  }
}

function onChangePasswordSuccess(): void {
  gtm.pushChangePassword()
  storage.setKeystore(keystore.serialize())
}

function* onChangePasswordError(/* err */): Saga<void> {
  yield put({
    type: SET_INVALID_FIELD,
    fieldName: 'password',
    message: i18n('routes.changePassword.error.password.invalid'),
  })
}

function* onPasswordConfirmationError(): Saga<void> {
  yield put({
    type: SET_INVALID_FIELD,
    fieldName: 'confirmPassword',
    message: i18n('routes.changePassword.error.confirmPassword.notMatched'),
  })
}

export function* watchChangePassword(): Saga<void> {
  yield takeEvery(CHANGE, onChangePassword)
}
