// @flow

import { put, select, takeEvery } from 'redux-saga/effects'

import walletsWorker from 'workers/wallets'
import { selectWallets, selectWalletsImport } from 'store/stateSelectors'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsImport from '../modules/walletsImport'

function* checkName(): Saga<void> {
  const { items }: WalletsState = yield select(selectWallets)
  const { name }: WalletsCreateState = yield select(selectWalletsImport)

  if (!name) {
    yield put(walletsImport.setInvalidField('name', 'Name should not be empty'))

    return
  }

  walletsWorker.checkNameRequest(items, name)
}

function* checkNameError(action: { payload: Error }): Saga<void> {
  yield put(walletsImport.setInvalidField('name', action.payload.message))
}

function* checkNameSuccess(): Saga<void> {
  yield put(walletsImport.setCurrentStep(walletsImport.STEPS.DATA))
}

function* checkDerivationPath(): Saga<void> {
  const { derivationPath }: WalletsImportState = yield select(selectWalletsImport)

  if (!derivationPath) {
    yield put(walletsImport.checkDerivationPathSuccess())
  }

  walletsWorker.checkDerivationPathRequest(derivationPath)
}

function* checkDerivationPathError(
  action: ExtractReturn<typeof walletsImport.checkDerivationPathError>,
): Saga<void> {
  yield put(walletsImport.setInvalidField('name', action.payload.message))
}

function* checkDerivationPathSuccess(): Saga<void> {
  yield put(walletsImport.setCurrentStep(walletsImport.STEPS.PASSWORD))
}

function* importWallet(): Saga<void> {
  const walletsData: WalletsState = yield select(selectWallets)

  const {
    data,
    name,
    password,
    passphrase,
    passwordHint,
    derivationPath,
    passwordConfirm,
  }: WalletsImportState = yield select(selectWalletsImport)

  const isPasswordExists: boolean = !!walletsData.testPasswordData

  if (!isPasswordExists) {
    if (password !== passwordConfirm) {
      yield put(
        walletsImport.setInvalidField('passwordConfirm', 'Password does not match confirmation'),
      )

      return
    }

    if (!passwordHint) {
      yield put(
        walletsImport.setInvalidField('passwordHint', 'Password hint is required'),
      )

      return
    }

    if (password === passwordHint) {
      yield put(
        walletsImport.setInvalidField('passwordHint', 'Password and hint should not be equal'),
      )

      return
    }
  }

  const importWalletData = {
    data,
    name,
    passphrase,
    derivationPath,
  }

  walletsWorker.importRequest(walletsData, importWalletData, password, passwordHint)
}

function* importError(action: { payload: Error }): Saga<void> {
  yield put(walletsImport.setInvalidField('password', action.payload.message))
}

function* importSuccess(action: ExtractReturn<typeof wallets.setWallets>): Saga<void> {
  const { payload } = action

  yield put(wallets.setWallets(payload))

  const { items } = payload
  const importedWallet: Wallet = items[items.length - 1]

  yield put(wallets.setActiveWallet(importedWallet.id))
}

export function* openView(): Saga<void> {
  yield put(walletsImport.clean())
}

function checkWalletType(action: ExtractReturn<typeof walletsImport.changeDataInput>) {
  const { data } = action.payload

  walletsWorker.checkWalletTypeRequest(data)
}

export function* setNextStep(): Saga<void> {
  const { currentStep }: WalletsCreateState = yield select(selectWalletsImport)

  switch (currentStep) {
    case walletsImport.STEPS.NAME: {
      yield* checkName()
      break
    }

    case walletsImport.STEPS.DATA: {
      yield* checkDerivationPath()
      break
    }

    case walletsImport.STEPS.PASSWORD: {
      yield* importWallet()
      break
    }

    default:
      break
  }
}

function* goToWalletsStartView(): Saga<void> {
  yield put(walletsImport.goToStartView())
}

function* goToWalletsImportNameStep(): Saga<void> {
  yield put(walletsImport.setCurrentStep(walletsImport.STEPS.NAME))
}

function* goToWalletsImportDataStep(): Saga<void> {
  yield put(walletsImport.setCurrentStep(walletsImport.STEPS.DATA))
}

export function* setPrevStep(): Saga<void> {
  const { currentStep }: WalletsCreateState = yield select(selectWalletsImport)

  switch (currentStep) {
    case walletsImport.STEPS.NAME: {
      yield* goToWalletsStartView()
      break
    }

    case walletsImport.STEPS.DATA: {
      yield* goToWalletsImportNameStep()
      break
    }

    case walletsImport.STEPS.PASSWORD: {
      yield* goToWalletsImportDataStep()
      break
    }

    default:
      break
  }
}

export function* walletsImportRootSaga(): Saga<void> {
  yield takeEvery(walletsImport.OPEN_VIEW, openView)
  yield takeEvery(walletsImport.CHANGE_DATA_INPUT, checkWalletType)
  yield takeEvery(walletsImport.GO_TO_NEXT_STEP, setNextStep)
  yield takeEvery(walletsImport.GO_TO_PREV_STEP, setPrevStep)
  yield takeEvery(walletsImport.IMPORT_ERROR, importError)
  yield takeEvery(walletsImport.IMPORT_SUCCESS, importSuccess)
  yield takeEvery(walletsImport.CHECK_NAME_ERROR, checkNameError)
  yield takeEvery(walletsImport.CHECK_NAME_SUCCESS, checkNameSuccess)
  yield takeEvery(walletsImport.CHECK_DERIVATION_PATH_ERROR, checkDerivationPathError)
  yield takeEvery(walletsImport.CHECK_DERIVATION_PATH_SUCCESS, checkDerivationPathSuccess)
}
