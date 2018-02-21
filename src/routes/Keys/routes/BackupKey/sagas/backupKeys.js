// @flow

import { put, select, takeEvery } from 'redux-saga/effects'

import { fileSaver, gtm, keystore } from 'services'
import { selectCurrentKeyId } from 'store/stateSelectors'

import { SET_INVALID_FIELD, BACKUP } from '../modules/backupKeys'

function selectBackupKeysPassword(state: { backupKeys: { password: string } }): string {
  return state.backupKeys.password
}

function* onBackupKeys(): Saga<void> {
  const password: string = yield select(selectBackupKeysPassword)

  if (!password) {
    return
  }

  try {
    const walletId = yield select(selectCurrentKeyId)
    fileSaver.saveJSON(keystore.getDecryptedWallet(password, walletId), 'jwallet-keystore-backup')
    onBackupKeysSuccess()
  } catch (err) {
    yield onBackupKeysError()
  }
}

function onBackupKeysSuccess(): void {
  gtm.pushBackupKeystore('Success')
}

function* onBackupKeysError(): Saga<void> {
  yield put({
    type: SET_INVALID_FIELD,
    fieldName: 'password',
    message: i18n('routes.backupKeys.error.password.invalid'),
  })
}

export function* watchBackupKeys(): Saga<void> {
  yield takeEvery(BACKUP, onBackupKeys)
}
