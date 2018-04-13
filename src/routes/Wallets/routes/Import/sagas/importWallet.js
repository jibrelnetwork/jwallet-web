// @flow

import Keystore from 'jwallet-web-keystore'
import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import isMnemonicType from 'utils/keystore/isMnemonicType'
import InvalidFieldError from 'utils/errors/InvalidFieldError'
import { keystore, validate } from 'services'
import { selectWalletsItems, selectImportWallet } from 'store/stateSelectors'
import { setActiveSuccess as setWalletId } from 'routes/Wallets/modules/wallets'

import {
  OPEN,
  CLOSE,
  SET_NEXT_STEP,
  SET_PREV_STEP,
  SET_DATA,
  STEPS,
  setWalletType,
  setCurrentStep,
  importSuccess,
  importError,
  clean,
} from '../modules/importWallet'

type NewWalletData = {
  type: string,
  isReadOnly: boolean,
  customType: WalletType,
  mnemonic?: string,
  bip32XPublicKey?: string,
  privateKey?: string,
  address?: string,
  derivationPath?: string,
}

function* openImportWallet(): Saga<void> {
  yield put(setCurrentStep(STEPS.NAME))
}

function* closeImportWallet(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* setNextStep(): Saga<void> {
  const { currentStep }: ImportWalletData = yield select(selectImportWallet)

  try {
    switch (currentStep) {
      case STEPS.NAME: {
        yield checkName()
        break
      }

      case STEPS.DATA: {
        yield checkData()
        break
      }

      case STEPS.PASSWORD: {
        yield importWallet()
        break
      }

      default: break
    }
  } catch (err) {
    yield put(importError(err))
  }
}

function* setPrevStep(): Saga<void> {
  const { currentStep, walletType }: ImportWalletData = yield select(selectImportWallet)

  try {
    switch (currentStep) {
      case STEPS.DATA: {
        yield put(setCurrentStep(STEPS.NAME, walletType))
        break
      }

      case STEPS.PASSWORD: {
        yield put(setCurrentStep(STEPS.DATA, walletType))
        break
      }

      default: break
    }
  } catch (err) {
    yield put(importError(err))
  }
}

function* setImportWalletType(action: { payload: { data: string } }): Saga<void> {
  try {
    const { data }: { data: string } = action.payload

    if (!data || (data.length < 20)) {
      return
    }

    const { customType }: NewWalletData = getNewWalletData(action.payload.data)
    yield put(setWalletType(customType))
  } catch (err) {
    yield put(importError(err))
  }
}

function* checkName() {
  const wallets: Wallets = yield select(selectWalletsItems)
  const { name }: ImportWalletData = yield select(selectImportWallet)

  validate.walletName(name, wallets)

  yield put(setCurrentStep(STEPS.DATA))
}

function* checkData() {
  const {
    walletType,
    knownDerivationPath,
    customDerivationPath,
    selectedDerivationPathType,
  }: ImportWalletData = yield select(selectImportWallet)

  const derivationPath: string = {
    custom: customDerivationPath,
    known: knownDerivationPath,
  }[selectedDerivationPathType]

  if (isMnemonicType(walletType)) {
    validate.derivationPath(derivationPath)
  }

  yield put(setCurrentStep(STEPS.PASSWORD, walletType))
}

function getNewWalletData(data: string) {
  if (Keystore.isMnemonicValid(data)) {
    return { type: 'mnemonic', customType: 'mnemonic', isReadOnly: false, mnemonic: data }
  } else if (Keystore.isBip32XPublicKeyValid(data)) {
    return { type: 'mnemonic', customType: 'bip32Xpub', isReadOnly: true, bip32XPublicKey: data }
  } else if (Keystore.isPrivateKeyValid(data)) {
    return { type: 'address', customType: 'privateKey', isReadOnly: false, privateKey: data }
  } else if (Keystore.isAddressValid(data)) {
    return { type: 'address', customType: 'address', isReadOnly: true, address: data }
  }

  throw new InvalidFieldError('data', i18n('routes.importWallet.error.data.invalid'))
}

function* importWallet() {
  const {
    data,
    name,
    password,
    passwordConfirm,
    knownDerivationPath,
    customDerivationPath,
    selectedDerivationPathType,
  }: ImportWalletData = yield select(selectImportWallet)

  validate.walletPassword(password, passwordConfirm)
  const newWalletData: NewWalletData = getNewWalletData(data)

  try {
    const id: WalletId = keystore.createWallet({
      ...newWalletData,
      name,
      password,
      derivationPath: {
        custom: customDerivationPath,
        known: knownDerivationPath,
      }[selectedDerivationPathType],
    })

    yield put(setCurrentStep(STEPS.ASSETS, newWalletData.customType))
    yield put(importSuccess())
    yield put(setWalletId(id))
  } catch (err) {
    const isPasswordError = /password/ig.test(err.message)

    if (!isPasswordError) {
      yield put(setCurrentStep(STEPS.DATA, newWalletData.customType))
    }

    throw new InvalidFieldError(isPasswordError ? 'password' : 'data', err.message)
  }
}

export function* watchImportWalletOpen(): Saga<void> {
  yield takeEvery(OPEN, openImportWallet)
}

export function* watchImportWalletClose(): Saga<void> {
  yield takeEvery(CLOSE, closeImportWallet)
}

export function* watchImportWalletSetNextStep(): Saga<void> {
  yield takeEvery(SET_NEXT_STEP, setNextStep)
}

export function* watchImportWalletSetPrevStep(): Saga<void> {
  yield takeEvery(SET_PREV_STEP, setPrevStep)
}

export function* watchImportWalletSetData(): Saga<void> {
  yield takeEvery(SET_DATA, setImportWalletType)
}
