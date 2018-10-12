// @flow

import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import walletsWorker from 'workers/wallets'
import { selectWallets, selectWalletsBackup } from 'store/stateSelectors'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsBackup from '../modules/walletsBackup'

function* backupWallet(walletId: string): Saga<void> {
  const { items, password } = yield select(selectWallets)

  if (!password) {
    yield put(
      wallets.setInvalidField('password', 'Password should not be empty'),
    )

    return
  }

  yield put(wallets.setIsLoading(true))
  yield walletsWorker.backupRequest(items, walletId, password)
}

function* backupError(action: { payload: Error }): Saga<void> {
  yield put(wallets.setInvalidField('password', action.payload.message))
  yield put(wallets.setIsLoading(false))
}

function* backupSuccess(): Saga<void> {
  yield put(wallets.setIsLoading(false))
  yield put(walletsBackup.setCurrentStep(walletsBackup.STEPS.PRIVATE))
}

function* closeView(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(walletsBackup.clean())
}

function* setNextStep(action: ExtractReturn<typeof walletsBackup.goToNextStep>): Saga<void> {
  const { walletId } = action.payload
  const { currentStep }: WalletsBackupState = yield select(selectWalletsBackup)

  switch (currentStep) {
    case walletsBackup.STEPS.PASSWORD: {
      yield* backupWallet(walletId)
      break
    }

    default:
      break
  }
}

function* setPrevStep(): Saga<void> {
  const { currentStep }: WalletsBackupState = yield select(selectWalletsBackup)

  switch (currentStep) {
    case walletsBackup.STEPS.PASSWORD: {
      yield put(wallets.goToStartView())
      break
    }

    case walletsBackup.STEPS.PRIVATE: {
      yield put(walletsBackup.setCurrentStep(walletsBackup.STEPS.PASSWORD))
      break
    }

    default:
      break
  }
}

function* clean(): Saga<void> {
  yield put(wallets.clean())
}

export function* walletsBackupRootSaga(): Saga<void> {
  yield takeEvery(walletsBackup.CLEAN, clean)
  yield takeEvery(walletsBackup.CLOSE_VIEW, closeView)
  yield takeEvery(walletsBackup.GO_TO_NEXT_STEP, setNextStep)
  yield takeEvery(walletsBackup.GO_TO_PREV_STEP, setPrevStep)
  yield takeEvery(walletsBackup.BACKUP_ERROR, backupError)
  yield takeEvery(walletsBackup.BACKUP_SUCCESS, backupSuccess)
}
