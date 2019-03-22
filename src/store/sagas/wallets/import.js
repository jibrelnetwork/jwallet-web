// @flow

import { push } from 'react-router-redux'
import { t } from 'ttag'

import {
  put,
  call,
  select,
  takeEvery,
} from 'redux-saga/effects'

import config from 'config'
import walletsWorker from 'workers/wallets'
import checkPasswordStrength from 'utils/encryption/checkPasswordStrength'
import checkDerivationPathValid from 'utils/mnemonic/checkDerivationPathValid'

import {
  getTypeByInput,
  checkWalletUniqueness,
} from 'utils/wallets'

import {
  selectWallets,
  selectWalletsItems,
  selectWalletsImport,
} from 'store/selectors/wallets'

import * as wallets from 'store/modules/wallets'
import * as walletsImport from 'store/modules/walletsImport'

function* checkName(): Saga<void> {
  const {
    name,
    persist,
  }: ExtractReturn<typeof selectWallets> = yield select(selectWallets)

  const nameCleaned: string = name.trim()

  if (!nameCleaned) {
    yield put(wallets.setInvalidField('name', t`Name should not be empty`))

    return
  }

  try {
    checkWalletUniqueness(persist.items, nameCleaned, 'name')
    yield put(walletsImport.setCurrentStep(walletsImport.STEPS.DATA))
  } catch (err) {
    yield put(wallets.setInvalidField('name', err.message))
  }
}

function* checkData(): Saga<void> {
  const {
    data,
    walletType,
    derivationPath,
  }: ExtractReturn<typeof selectWalletsImport> = yield select(selectWalletsImport)

  if (!data) {
    yield put(walletsImport.setInvalidField('data', t`Data is empty`))

    return
  }

  if (!walletType) {
    yield put(walletsImport.setInvalidField('data', t`Data is invalid`))

    return
  }

  if (derivationPath) {
    try {
      checkDerivationPathValid(derivationPath)
    } catch (err) {
      yield put(walletsImport.setInvalidField('derivationPath', t`Derivation path is not valid`))

      return
    }
  }

  yield put(walletsImport.setCurrentStep(walletsImport.STEPS.PASSWORD))
}

function* importWallet(): Saga<void> {
  const walletsData: ExtractReturn<typeof selectWallets> = yield select(selectWallets)

  const {
    persist,
    name,
    password,
    passwordHint,
    passwordConfirm,
  } = walletsData

  const {
    data,
    passphrase,
    derivationPath,
    walletType,
  }: ExtractReturn<typeof selectWalletsImport> = yield select(selectWalletsImport)

  const walletData = walletType === 'address' && !data.startsWith('0x') ?
    `0x${data}` :
    data

  const isPasswordExists: boolean = !!persist.internalKey

  if (!isPasswordExists) {
    if (password === name) {
      yield put(
        wallets.setInvalidField('password', t`Password should not be equal with wallet name`),
      )

      return
    }

    if (password !== passwordConfirm) {
      yield put(
        walletsImport.setInvalidField('passwordConfirm', t`Password does not match confirmation`),
      )

      return
    }

    if (!passwordHint) {
      yield put(
        walletsImport.setInvalidField('passwordHint', t`Password hint is required`),
      )

      return
    }

    if (password === passwordHint) {
      yield put(
        walletsImport.setInvalidField('passwordHint', t`Password and hint should not be equal`),
      )

      return
    }

    const { score }: PasswordResult = yield call(checkPasswordStrength, password)

    if (score < config.minPasswordStrengthScore) {
      return
    }
  }

  const importWalletData = {
    data: walletData,
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

function* checkWalletType(action: ExtractReturn<typeof walletsImport.changeDataInput>): Saga<void> {
  const walletType: ?WalletCustomType = getTypeByInput(action.payload.data)
  yield put(walletsImport.setWalletType(walletType))
}

export function* setNextStep(): Saga<void> {
  const { currentStep }: ExtractReturn<typeof selectWalletsImport> =
    yield select(selectWalletsImport)

  switch (currentStep) {
    case walletsImport.STEPS.NAME: {
      yield* checkName()

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
  const items: ExtractReturn<typeof selectWalletsItems> = yield select(selectWalletsItems)

  const { currentStep }: ExtractReturn<typeof selectWalletsImport> =
    yield select(selectWalletsImport)

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
