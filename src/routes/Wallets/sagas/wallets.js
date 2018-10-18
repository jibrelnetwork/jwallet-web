// @flow

import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects'

import config from 'config'
import walletsWorker from 'workers/wallets'
import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import * as walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'

import * as wallets from '../modules/wallets'

function* checkNameRequest(action: ExtractReturn<typeof wallets.checkNameRequest>): Saga<void> {
  const { items, name, newWalletLocation } = action.payload

  if (!name) {
    yield put(wallets.setInvalidField('name', 'Name should not be empty'))

    return
  }

  yield put(wallets.setIsLoading(true))

  walletsWorker.checkNameRequest(items, name, newWalletLocation)
}

function* checkNameError(action: { payload: Error }): Saga<void> {
  yield put(wallets.setInvalidField('name', action.payload.message))
  yield put(wallets.setIsLoading(false))
}

function* checkNameSuccess(action: ExtractReturn<typeof wallets.checkNameSuccess>): Saga<void> {
  switch (action.payload.newWalletLocation) {
    case 'create':
      yield put(walletsCreate.setCurrentStep(walletsCreate.STEPS.PASSWORD))
      break

    case 'import':
      yield put(walletsImport.setCurrentStep(walletsImport.STEPS.DATA))
      break

    default:
      break
  }

  yield put(wallets.setIsLoading(false))
}

function* closeView(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(wallets.clean())
}

export function* walletsRootSaga(): Saga<void> {
  yield takeEvery(wallets.CLOSE_VIEW, closeView)
  yield takeEvery(wallets.CHECK_NAME_ERROR, checkNameError)
  yield takeEvery(wallets.CHECK_NAME_SUCCESS, checkNameSuccess)
  yield takeEvery(wallets.CHECK_NAME_REQUEST, checkNameRequest)
}
