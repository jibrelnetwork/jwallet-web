import { put, takeEvery } from 'redux-saga/effects'

import { gtm, storage, keystore } from 'services'

import { SET_INVALID_FIELD, CHANGE } from '../modules/changePassword'

function* onChangePassword(action: { oldPassword: Password, newPassword: Password }) {
  const { oldPassword, newPassword } = action

  try {
    keystore.setPassword(oldPassword, newPassword)
    onChangePasswordSuccess()
  } catch (err) {
    yield onChangePasswordFail(err)
  }
}

function onChangePasswordSuccess() {
  gtm.pushChangePassword()
  storage.setKeystore(keystore.serialize())
}

function* onChangePasswordFail(/* err */) {
  yield put({
    type: SET_INVALID_FIELD,
    fieldName: 'oldPassword',
    message: i18n('modals.backupKeystore.error.password.invalid'),
  })
}

export function* watchChangePassword(): Saga<void> {
  yield takeEvery(CHANGE, onChangePassword)
}
