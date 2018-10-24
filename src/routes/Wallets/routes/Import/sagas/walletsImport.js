// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import keystore from 'services/keystore'
import walletsWorker from 'workers/wallets'
import { selectWallets, selectWalletsImport } from 'store/stateSelectors'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsImport from '../modules/walletsImport'

function* checkData(): Saga<void> {
  const {
    data,
    walletType,
    derivationPath,
  }: WalletsImportState = yield select(selectWalletsImport)

  if (!data) {
    yield put(walletsImport.setInvalidField('data', 'Data is empty'))

    return
  }

  if (!walletType) {
    yield put(walletsImport.setInvalidField('data', 'Data is invalid'))

    return
  }

  if (derivationPath) {
    try {
      keystore.checkDerivationPath(derivationPath)
    } catch (err) {
      yield put(walletsImport.setInvalidField('derivationPath', 'Derivation path is not valid'))

      return
    }
  }

  yield put(walletsImport.setCurrentStep(walletsImport.STEPS.PASSWORD))
}

function* importWallet(): Saga<void> {
  const walletsData: WalletsState = yield select(selectWallets)

  const {
    name,
    password,
    passwordHint,
    passwordConfirm,
  } = walletsData

  const {
    data,
    passphrase,
    derivationPath,
  }: WalletsImportState = yield select(selectWalletsImport)

  const isPasswordExists: boolean = !!walletsData.testPasswordData

  if (!isPasswordExists) {
    if (password === name) {
      yield put(
        wallets.setInvalidField('password', 'Password should not be equal with wallet name'),
      )

      return
    }

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
    passphrase,
    derivationPath,
  }

  yield put(wallets.setIsLoading(true))

  walletsWorker.importRequest(walletsData, importWalletData)
}

function* importError(action: { payload: Error }): Saga<void> {
  yield put(walletsImport.setInvalidField('password', action.payload.message))
  yield put(wallets.setIsLoading(false))
}

function* importSuccess(action: ExtractReturn<typeof wallets.setWallets>): Saga<void> {
  const { payload } = action

  yield put(wallets.setWallets(payload))
  yield put(wallets.setIsLoading(false))

  const { items } = payload
  const importedWallet: Wallet = items[items.length - 1]

  yield put(wallets.setActiveWallet(importedWallet.id))
}

function* checkWalletType(action: ExtractReturn<typeof walletsImport.changeDataInput>) {
  const walletType: ?WalletCustomType = keystore.getDataType(action.payload.data)
  yield put(walletsImport.setWalletType(walletType))
}

export function* setNextStep(): Saga<void> {
  const { items, name }: WalletsState = yield select(selectWallets)
  const { currentStep }: WalletsImportState = yield select(selectWalletsImport)

  switch (currentStep) {
    case walletsImport.STEPS.NAME: {
      yield put(wallets.checkNameRequest(items, name, 'import'))
      break
    }

    case walletsImport.STEPS.DATA: {
      yield* checkData()
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

function* goToWalletsImportNameStep(): Saga<void> {
  yield put(walletsImport.setCurrentStep(walletsImport.STEPS.NAME))
}

function* goToWalletsImportDataStep(): Saga<void> {
  yield put(walletsImport.setCurrentStep(walletsImport.STEPS.DATA))
}

export function* setPrevStep(): Saga<void> {
  const { items }: WalletsState = yield select(selectWallets)
  const { currentStep }: WalletsImportState = yield select(selectWalletsImport)

  switch (currentStep) {
    case walletsImport.STEPS.NAME: {
      const isEmptyWallets: boolean = !items.length

      yield put(push(isEmptyWallets ? '/wallets/start' : '/wallets'))

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

function* clean(): Saga<void> {
  yield put(wallets.clean())
  yield put(walletsImport.clean())
}

export function* walletsImportRootSaga(): Saga<void> {
  yield takeEvery(walletsImport.OPEN_VIEW, clean)
  yield takeEvery(walletsImport.CLOSE_VIEW, clean)
  yield takeEvery(walletsImport.GO_TO_NEXT_STEP, setNextStep)
  yield takeEvery(walletsImport.GO_TO_PREV_STEP, setPrevStep)
  yield takeEvery(walletsImport.IMPORT_ERROR, importError)
  yield takeEvery(walletsImport.IMPORT_SUCCESS, importSuccess)
  yield takeEvery(walletsImport.CHANGE_DATA_INPUT, checkWalletType)
}
