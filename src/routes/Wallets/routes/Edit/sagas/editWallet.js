// @flow

import { delay } from 'redux-saga'
import { equals, toLower } from 'ramda'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import InvalidFieldError from 'utils/errors/InvalidFieldError'
import { keystore, validate } from 'services'
import { isMnemonicType, isKnownPath } from 'utils/keystore'
import { selectWalletsItems, selectWalletId, selectEditWallet } from 'store/stateSelectors'

import {
  OPEN,
  CLOSE,
  SET_NEXT_STEP,
  STEPS,
  setWalletType,
  setName,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setCurrentStep,
  editSuccess,
  editError,
  clean,
} from '../modules/editWallet'

function* openEditWallet(): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    return
  }

  try {
    const { name, customType, derivationPath }: Wallet = keystore.getWallet(walletId)

    yield put(setName(name))
    yield put(setWalletType(customType))

    if (derivationPath) {
      yield put(isKnownPath(derivationPath)
        ? setKnownDerivationPath(derivationPath)
        : setCustomDerivationPath(derivationPath),
      )
    }
  } catch (err) {
    // TODO: handle this case in appropriate way
    yield put(editError(err))
  }
}

function* closeEditWallet(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* setNextStep(): Saga<void> {
  const { currentStep }: EditWalletData = yield select(selectEditWallet)

  try {
    switch (currentStep) {
      case STEPS.FORM: {
        yield checkData()
        break
      }

      case STEPS.PASSWORD: {
        yield saveWallet()
        break
      }

      default: break
    }
  } catch (err) {
    yield put(editError(err))
  }
}

function* checkData() {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    return
  }

  const wallets: Wallets = yield select(selectWalletsItems)
  const { walletType, name }: EditWalletData = yield select(selectEditWallet)
  const wallet: Wallet = keystore.getWallet(walletId)

  /**
   * If wallet type is not full mnemonic we should just update its name,
   * otherwise we should check name & derivationPath and then ask for password
   */
  if (!isMnemonicType(walletType)) {
    if (!isEqual(wallet.name, name)) {
      validate.walletName(name, wallets)
    }

    setWalletName(walletId, name)

    yield put(editSuccess(walletType))
  } else {
    yield checkEditData(wallets, walletId)
  }
}

function setWalletName(walletId: WalletId, name: string) {
  try {
    const wallet: Wallet = keystore.getWallet(walletId)

    if (isEqual(wallet.name, name)) {
      return
    }

    keystore.setWalletName(walletId, name)
  } catch (err) {
    throw new InvalidFieldError('name', err.message)
  }
}

function* checkEditData(wallets: Wallets, walletId: WalletId) {
  const {
    name,
    walletType,
    customDerivationPath,
    knownDerivationPath,
    selectedDerivationPathType,
  }: EditWalletData = yield select(selectEditWallet)

  const wallet: Wallet = keystore.getWallet(walletId)

  if (!isEqual(wallet.name, name)) {
    validate.walletName(name, wallets)
  }

  const derivationPath: string = {
    custom: customDerivationPath,
    known: knownDerivationPath,
  }[selectedDerivationPathType]

  if (
    !isEqual(wallet.derivationPath, derivationPath) &&
    selectedDerivationPathType === 'custom'
  ) {
    validate.derivationPath(derivationPath)
  }

  yield put(setCurrentStep(STEPS.PASSWORD, walletType))
}

function* saveWallet(): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    return
  }

  try {
    const {
      name,
      password,
      walletType,
      knownDerivationPath,
      customDerivationPath,
      selectedDerivationPathType,
    }: EditWalletData = yield select(selectEditWallet)

    const derivationPath: string = {
      custom: customDerivationPath,
      known: knownDerivationPath,
    }[selectedDerivationPathType]

    setWalletName(walletId, name)
    setDerivationPath(password, walletId, derivationPath)

    yield put(editSuccess(walletType))
  } catch (err) {
    throw new InvalidFieldError('password', err.message)
  }
}

function setDerivationPath(password: Password, walletId: WalletId, derivationPath: string) {
  try {
    const wallet: Wallet = keystore.getWallet(walletId)

    if (isEqual(wallet.derivationPath, derivationPath)) {
      return
    }

    keystore.setDerivationPath(password, walletId, derivationPath)
  } catch (err) {
    throw new InvalidFieldError('derivationPath', err.message)
  }
}

function isEqual(a: ?string, b: string) {
  return a && equals(toLower(a), toLower(b))
}

export function* watchEditWalletOpen(): Saga<void> {
  yield takeEvery(OPEN, openEditWallet)
}

export function* watchEditWalletClose(): Saga<void> {
  yield takeEvery(CLOSE, closeEditWallet)
}

export function* watchEditWalletSetNextStep(): Saga<void> {
  yield takeEvery(SET_NEXT_STEP, setNextStep)
}
