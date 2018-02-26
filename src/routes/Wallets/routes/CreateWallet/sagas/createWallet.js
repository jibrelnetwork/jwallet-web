// @flow

import Keystore from 'jwallet-web-keystore'
import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { fileSaver, keystore } from 'services'
import { InvalidFieldError, validateWalletName } from 'utils'
import { selectWallets, selectCreateWallet } from 'store/stateSelectors'

import {
  OPEN,
  CLOSE,
  SET_NEXT_STEP,
  SET_PREV_STEP,
  STEPS,
  close,
  setMnemonic,
  setCurrentStep,
  clean,
  createSuccess,
  createError,
} from '../modules/createWallet'

function* openCreateWallet(): Saga<void> {
  yield generateMnemonic()
  yield put(setCurrentStep(STEPS.MNEMONIC))
}

function* closeCreateWallet(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* setNextStep(): Saga<void> {
  const { currentStep }: CreateWalletData = yield select(selectCreateWallet)

  try {
    switch (currentStep) {
      case STEPS.MNEMONIC: {
        yield saveMnemonicToFile()
        break
      }

      case STEPS.CONFIRM: {
        yield checkMnemonic()
        break
      }

      case STEPS.PASSWORD: {
        yield createWallet()
        break
      }

      case STEPS.ASSETS: {
        yield put(close())
        break
      }

      default: break
    }
  } catch (err) {
    yield put(createError(err))
  }
}

function* setPrevStep(): Saga<void> {
  const { currentStep }: CreateWalletData = yield select(selectCreateWallet)

  try {
    switch (currentStep) {
      case STEPS.CONFIRM: {
        yield openCreateWallet()
        break
      }

      case STEPS.PASSWORD: {
        yield put(setCurrentStep(STEPS.CONFIRM))
        break
      }

      default: break
    }
  } catch (err) {
    yield put(createError(err))
  }
}

function* generateMnemonic() {
  yield put(setMnemonic(Keystore.generateMnemonic().toString()))
}

function* saveMnemonicToFile() {
  const wallets: Wallets = yield select(selectWallets)
  const { name, mnemonic }: CreateWalletData = yield select(selectCreateWallet)

  validateWalletName(name, wallets)
  fileSaver.saveTXT(mnemonic, `jwallet ${name}`)

  yield put(setCurrentStep(STEPS.CONFIRM))
}

function* checkMnemonic() {
  const { mnemonic, mnemonicConfirm }: CreateWalletData = yield select(selectCreateWallet)

  if (mnemonic !== mnemonicConfirm) {
    throw new InvalidFieldError('mnemonicConfirm', i18n('general.error.mnemonicConfirm.notMatched'))
  }

  yield put(setCurrentStep(STEPS.PASSWORD))
}

function* createWallet() {
  const createWalletData: CreateWalletData = yield select(selectCreateWallet)
  const { mnemonic, name, password, passwordConfirm }: CreateWalletData = createWalletData

  yield checkPassword(password, passwordConfirm)

  try {
    keystore.createWallet({
      password,
      mnemonic,
      type: 'mnemonic',
      name: name.trim(),
    })

    yield put(setCurrentStep(STEPS.ASSETS))
    yield put(createSuccess())
  } catch (err) {
    throw new InvalidFieldError('password', err.message)
  }
}

function checkPassword(password: Password, passwordConfirm: Password) {
  testKeystorePassword(password)

  if (password !== passwordConfirm) {
    throw new InvalidFieldError('passwordConfirm', i18n('general.error.passwordConfirm.notMatched'))
  }
}

function testKeystorePassword(password: Password) {
  const error = Keystore.testPassword(password).errors[0]

  if (error) {
    throw new InvalidFieldError('password', error)
  }
}

export function* watchCreateWalletOpen(): Saga<void> {
  yield takeEvery(OPEN, openCreateWallet)
}

export function* watchCreateWalletClose(): Saga<void> {
  yield takeEvery(CLOSE, closeCreateWallet)
}

export function* watchCreateWalletSetNextStep(): Saga<void> {
  yield takeEvery(SET_NEXT_STEP, setNextStep)
}

export function* watchCreateWalletSetPrevStep(): Saga<void> {
  yield takeEvery(SET_PREV_STEP, setPrevStep)
}
