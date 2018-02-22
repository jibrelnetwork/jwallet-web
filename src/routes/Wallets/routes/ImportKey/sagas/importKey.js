// @flow

import Keystore from 'jwallet-web-keystore'
import { delay } from 'redux-saga'
import { equals, toLower } from 'ramda'
import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { gtm, keystore } from 'services'
import { KEYSTORE_CREATE_ACCOUNT } from 'routes/JWallet/modules/keystore'
import { selectImportKey, selectKeystore, selectKeystoreKeys } from 'store/stateSelectors'

import {
  getKeystoreAccountType,
  isKeystoreInitialised,
  isMnemonicType,
  InvalidFieldError,
} from 'utils'

import {
  OPEN,
  CLOSE,
  SET_KEY_DATA,
  SET_IS_MNEMONIC,
  SET_NEXT_STEP,
  SET_PREV_STEP,
  SET_CURRENT_STEP,
  SET_TOTAL_STEPS,
  SET_VALID_FIELD,
  SET_INVALID_FIELD,
  CLEAN,
  STEPS,
} from '../modules/importKey'

const INITIALISED_STEPS = 3
const NOT_INITIALISED_STEPS = 4

declare type KeyData = {
  type: string,
  isReadOnly: boolean,
  mnemonic?: string,
  bip32XPublicKey?: string,
  privateKey?: string,
  address?: string,
  derivationPath?: string,
}

function* onOpen(): Saga<void> {
  yield setTotalSteps()
  yield setCurrentStep(STEPS.DATA)

  const isInitialized: boolean = yield isKeyExists()
  gtm.pushImportAccount('Start', undefined, isInitialized)
}

function* onClose(): Saga<void> {
  yield put(push('/'))
  yield delay(config.delayBeforeFormClean)
  yield put({ type: CLEAN })
}

function* onSetNextStep(): Saga<void> {
  const { currentStep }: ImportKeyData = yield select(selectImportKey)

  try {
    switch (currentStep) {
      case STEPS.DATA:
        return yield checkData()
      case STEPS.NAME:
        return yield checkName()
      case STEPS.PASSWORD:
        return yield importKey()
      case STEPS.ASSETS:
        return yield onClose()
      default:
        return null
    }
  } catch (err) {
    if (err instanceof InvalidFieldError) {
      yield setInvalidField(err.fieldName, err.message)
    }

    // console.error(err)

    return null
  }
}

function* onSetPrevStep(): Saga<void> {
  const { currentStep }: ImportKeyData = yield select(selectImportKey)

  try {
    switch (currentStep) {
      case STEPS.DATA:
        return null
      case STEPS.NAME:
        return yield setCurrentStep(STEPS.DATA)
      case STEPS.PASSWORD:
        return yield setCurrentStep(STEPS.NAME)
      case STEPS.ASSETS:
        return null
      default:
        return null
    }
  } catch (err) {
    if (err instanceof InvalidFieldError) {
      yield setInvalidField(err.fieldName, err.message)
    }

    // console.error(err)

    return null
  }
}

function* isKeyExists() {
  const keystoreData: KeystoreData = yield select(selectKeystore)

  return isKeystoreInitialised(keystoreData)
}

function* setCurrentStep(currentStep: Index) {
  yield put({ type: SET_CURRENT_STEP, currentStep })
}

function* setTotalSteps() {
  const isInitialized: boolean = yield isKeyExists()

  yield put({
    type: SET_TOTAL_STEPS,
    totalSteps: isInitialized ? INITIALISED_STEPS : NOT_INITIALISED_STEPS,
  })
}

function* onSetKeyData(action: { data: string }): Saga<void> {
  const { data }: { data: string } = action

  try {
    const keyData: KeyData = getKeyData(data)
    yield put({ type: SET_IS_MNEMONIC, isMnemonic: isFullMnemonicKey(keyData) })
  } catch (err) {
    // console.error(err)
  }
}

function* checkData() {
  const isInitialized: boolean = yield isKeyExists()
  const { data }: ImportKeyData = yield select(selectImportKey)
  const { type }: KeyData = getKeyData(data)

  yield validateDerivationPath()
  yield setCurrentStep(STEPS.NAME)

  gtm.pushImportAccount('SetData', type, isInitialized)
}

function* validateDerivationPath() {
  const importKeyData: ImportKeyData = yield select(selectImportKey)

  if (!importKeyData.isMnemonic) {
    return
  }

  const derivationPath: string = getDerivationPath(importKeyData)

  if (!Keystore.isDerivationPathValid(derivationPath)) {
    throw new InvalidFieldError(
      'customDerivationPath',
      i18n('routes.importKey.error.derivationPath.invalid'),
    )
  }
}

function getDerivationPath(data: ImportKeyData): string {
  return data.customDerivationPath || data.knownDerivationPath
}

function isFullMnemonicKey(data: { type: string, isReadOnly: boolean }) {
  return (isMnemonicType(data.type) && !data.isReadOnly)
}

function getKeyData(data: string) {
  if (Keystore.isMnemonicValid(data)) {
    return { type: 'mnemonic', isReadOnly: false, mnemonic: data }
  } else if (Keystore.isBip32XPublicKeyValid(data)) {
    return { type: 'mnemonic', isReadOnly: true, bip32XPublicKey: data }
  } else if (Keystore.isValidPrivateKey(data)) {
    return { type: 'address', isReadOnly: false, privateKey: data }
  } else if (Keystore.isValidAddress(data)) {
    return { type: 'address', isReadOnly: true, address: data }
  }

  throw new InvalidFieldError('data', i18n('routes.importKey.error.data.invalid'))
}

function* checkName() {
  const { name }: ImportKeyData = yield select(selectImportKey)

  if (!name) {
    throw new InvalidFieldError('name', i18n('routes.importKey.error.name.empty'))
  }

  if (/[^a-z0-9 ]/ig.test(name)) {
    throw new InvalidFieldError('name', i18n('routes.importKey.error.name.invalid'))
  }

  yield checkNameUniq(name)
  yield setCurrentStep(STEPS.PASSWORD)
}

function* checkNameUniq(name: string) {
  const keys: Accounts = yield select(selectKeystoreKeys)

  keys.forEach((key: Account) => {
    const newKeyName: string = toLower(name.trim())
    const isEqual: boolean = equals(newKeyName, toLower(key.name))

    if (isEqual) {
      throw new InvalidFieldError('name', i18n('routes.createKey.error.name.exists'))
    }
  })
}

function* importKey() {
  const isInitialized: boolean = yield isKeyExists()
  const importKeyData: ImportKeyData = yield select(selectImportKey)
  const { data, name, password } = importKeyData

  if (!isInitialized) {
    yield checkPasswordConfirm(importKeyData)
  }

  const keyData: KeyData = getKeyData(data)
  const keyType: string = getKeystoreAccountType(keyData)
  const derivationPath: string = getDerivationPath(importKeyData)

  gtm.pushImportAccount('EnterPassword', keyType, isInitialized)

  try {
    const walletId: AccountId = keystore.createWallet({
      ...keyData,
      name,
      password,
      derivationPath,
    })

    yield importKeySuccess(walletId, keyType, isInitialized)
  } catch (err) {
    yield importKeyError(err)
  }
}

function* importKeySuccess(accountId: AccountId, keyType: string, isInitialized: boolean) {
  yield put({ type: KEYSTORE_CREATE_ACCOUNT, accountId, isInitialized })

  if (isInitialized) {
    yield onClose()
  } else {
    yield setCurrentStep(STEPS.ASSETS)
  }

  gtm.pushImportAccount('ImportSuccess', keyType, isInitialized)
}

function importKeyError(err: { message: string }) {
  throw new InvalidFieldError('password', err.message)
}

function* checkPasswordConfirm(data: ImportKeyData) {
  testKeystorePassword(data.password)

  if (data.password !== data.passwordConfirm) {
    throw new InvalidFieldError(
      'passwordConfirm',
      i18n('routes.importKey.error.passwordConfirm.notMatched'),
    )
  }

  yield setValidField('passwordConfirm', '')
}

function testKeystorePassword(password: Password) {
  const error = Keystore.testPassword(password).errors[0]

  if (error) {
    throw new InvalidFieldError('password', error)
  }
}

function* setValidField(fieldName: string, message: string) {
  yield put({ type: SET_VALID_FIELD, fieldName, message })
}

function* setInvalidField(fieldName: string, message: string) {
  yield put({ type: SET_INVALID_FIELD, fieldName, message })
}

export function* watchSetNextImportKeyStep(): Saga<void> {
  yield takeEvery(SET_NEXT_STEP, onSetNextStep)
}

export function* watchSetPrevImportKeyStep(): Saga<void> {
  yield takeEvery(SET_PREV_STEP, onSetPrevStep)
}

export function* watchSetKeyData(): Saga<void> {
  yield takeEvery(SET_KEY_DATA, onSetKeyData)
}

export function* watchOpenImportKey(): Saga<void> {
  yield takeEvery(OPEN, onOpen)
}

export function* watchCloseImportKey(): Saga<void> {
  yield takeEvery(CLOSE, onClose)
}
