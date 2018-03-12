// @flow

import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { fileSaver, keystore } from 'services'
import { InvalidFieldError } from 'utils/errors'
import { selectWalletId, selectBackupWallet } from 'store/stateSelectors'

import {
  CLOSE,
  SET_NEXT_STEP,
  STEPS,
  setCurrentStep,
  backupSuccess,
  backupError,
  clean,
} from '../modules/backupWallet'

function* closeBackupWallet(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* setNextStep(): Saga<void> {
  const { currentStep }: BackupWalletData = yield select(selectBackupWallet)

  try {
    switch (currentStep) {
      case STEPS.FORM: {
        yield saveIfReadOnly()
        break
      }

      case STEPS.PASSWORD: {
        yield saveBackupWalletToFile()
        break
      }

      default: break
    }
  } catch (err) {
    yield put(backupError(err))
  }
}

function* saveIfReadOnly() {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    return
  }

  const { isReadOnly }: Wallet = keystore.getWallet(walletId)

  if (isReadOnly) {
    yield saveBackupWalletToFile()
  } else {
    yield put(setCurrentStep(STEPS.PASSWORD))
  }
}

function* saveBackupWalletToFile() {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    return
  }

  const { password }: BackupWalletData = yield select(selectBackupWallet)

  try {
    const walletData: DecryptedWalletData = keystore.getDecryptedWallet(password, walletId)
    fileSaver.saveJSON(walletData, `jwallet-backup ${walletData.name}`)
    yield put(backupSuccess(walletData.type))
  } catch (err) {
    throw new InvalidFieldError('password', err.message)
  }
}

export function* watchBackupWalletClose(): Saga<void> {
  yield takeEvery(CLOSE, closeBackupWallet)
}

export function* watchBackupWalletSetNextStep(): Saga<void> {
  yield takeEvery(SET_NEXT_STEP, setNextStep)
}
