import { put, select, takeEvery } from 'redux-saga/effects'

import { fileSaver, gtm, keystore } from 'services'

import * as BACKUP_KEYSTORE from '../modules/modals/backupKeystore'
import { selectBackupKeystoreModalData } from './stateSelectors'
import { KEYSTORE_OPEN_MODAL, KEYSTORE_BACKUP } from '../modules/keystore'

function* onBackupKeystore({ password }) {
  if (!password) {
    return
  }

  try {
    fileSaver.saveJSON(keystore.getDecryptedAccounts(password), 'jwallet-keystore-backup')
    gtm.pushBackupKeystore()

    yield onBackupKeystoreSuccess()
  } catch (err) {
    yield onBackupKeystoreFail()
  }
}

function* onBackupKeystoreSuccess() {
  yield put({ type: BACKUP_KEYSTORE.CLOSE_MODAL })
}

function* onBackupKeystoreFail() {
  yield put({
    type: BACKUP_KEYSTORE.SET_INVALID_FIELD,
    fieldName: 'password',
    message: i18n('modals.backupKeystore.error.password.invalid'),
  })
}

function* onCloseBackupKeystoreModal() {
  const { isOpenedFromKeystoreModal } = yield select(selectBackupKeystoreModalData)

  if (isOpenedFromKeystoreModal) {
    yield put({ type: KEYSTORE_OPEN_MODAL })
  }
}

export function* watchBackupKeystore() {
  yield takeEvery(KEYSTORE_BACKUP, onBackupKeystore)
}

export function* watchCloseBackupKeystoreModal() {
  yield takeEvery(BACKUP_KEYSTORE.CLOSE_MODAL, onCloseBackupKeystoreModal)
}
