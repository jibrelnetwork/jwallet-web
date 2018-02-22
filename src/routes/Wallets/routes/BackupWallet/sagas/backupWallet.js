// @flow

import { delay } from 'redux-saga'
import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { fileSaver, keystore } from 'services'
import { selectWalletId, selectBackupWallet } from 'store/stateSelectors'

import {
  OPEN,
  CLOSE,
  BACKUP,
  close,
  backupSuccess,
  backupError,
  clean,
} from '../modules/backupWallet'

function* openBackupWallet(): Saga<void> {
  const walletId: WalletId = yield select(selectWalletId)

  try {
    const { isReadOnly }: Wallet = keystore.getWallet(walletId)

    if (!isReadOnly) {
      return
    }

    yield saveBackupWalletToFile('', walletId)
  } catch (err) {
    // TODO: handle this case in appropriate way
    // console.error(err)
    yield put(close())
  }
}

function* closeBackupWallet(): Saga<void> {
  yield put(push('/'))
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* backupWallet(): Saga<void> {
  const { password }: BackupWalletData = yield select(selectBackupWallet)

  try {
    const walletId: WalletId = yield select(selectWalletId)
    yield saveBackupWalletToFile(password, walletId)
  } catch (err) {
    yield put(backupError(err))
  }
}

function* saveBackupWalletToFile(password: Password, walletId: WalletId) {
  const walletData: DecryptedWalletData = keystore.getDecryptedWallet(password, walletId)
  fileSaver.saveJSON(walletData, `jwallet-backup ${walletData.name}`)
  yield put(backupSuccess(walletData.type))
  yield put(close())
}

export function* watchOpenBackupWallet(): Saga<void> {
  yield takeEvery(OPEN, openBackupWallet)
}

export function* watchCloseBackupWallet(): Saga<void> {
  yield takeEvery(CLOSE, closeBackupWallet)
}

export function* watchBackupWallet(): Saga<void> {
  yield takeEvery(BACKUP, backupWallet)
}
