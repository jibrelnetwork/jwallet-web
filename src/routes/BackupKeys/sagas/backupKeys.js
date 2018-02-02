// @flow

import { put, takeEvery } from 'redux-saga/effects'

import { fileSaver, gtm, keystore } from 'services'

import { SET_INVALID_FIELD, BACKUP } from '../modules/backupKeys'

function* onBackupKeys(action: { password: Password }) {
  const { password } = action

  if (!password) {
    return
  }

  try {
    fileSaver.saveJSON(keystore.getDecryptedAccounts(password), 'jwallet-keystore-backup')
    onBackupKeysSuccess()
  } catch (err) {
    yield onBackupKeysFail()
  }
}

function onBackupKeysSuccess() {
  gtm.pushBackupKeystore('Success')
}

function* onBackupKeysFail() {
  yield put({
    type: SET_INVALID_FIELD,
    fieldName: 'password',
    message: i18n('modals.backupKeystore.error.password.invalid'),
  })
}

export function* watchBackupKeys(): Saga<void> {
  yield takeEvery(BACKUP, onBackupKeys)
}
