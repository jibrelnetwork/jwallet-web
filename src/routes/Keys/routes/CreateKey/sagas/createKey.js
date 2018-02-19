// @flow

import Keystore from 'jwallet-web-keystore'
import { delay } from 'redux-saga'
import { push } from 'react-router-redux'
import { equals, toLower } from 'ramda'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { fileSaver, gtm, keystore } from 'services'
import { InvalidFieldError, isKeystoreInitialised } from 'utils'
import { KEYSTORE_CREATE_ACCOUNT } from 'routes/JWallet/modules/keystore'
import { selectCreateKey, selectKeystore, selectKeystoreKeys } from 'store/stateSelectors'

import {
  OPEN,
  CLOSE,
  SET_NEXT_STEP,
  SET_PREV_STEP,
  SET_CURRENT_STEP,
  SET_TOTAL_STEPS,
  SET_MNEMONIC,
  SET_VALID_FIELD,
  SET_INVALID_FIELD,
  CLEAN,
  STEPS,
} from '../modules/createKey'

const INITIALISED_STEPS = 4
const NOT_INITIALISED_STEPS = 5

function* onOpen(): Saga<void> {
  yield generateMnemonic()
  yield setTotalSteps()
  yield setCurrentStep(STEPS.MNEMONIC)
}

function* onClose(): Saga<void> {
  yield put(push('/'))
  yield delay(config.delayBeforeFormClean)
  yield put({ type: CLEAN })
}

function* onNextStep(): Saga<void> {
  const { currentStep }: CreateKeyData = yield select(selectCreateKey)

  try {
    switch (currentStep) {
      case STEPS.MNEMONIC:
        return yield saveMnemonicToFile()
      case STEPS.CONFIRM:
        return yield checkMnemonic()
      case STEPS.NAME:
        return yield checkName()
      case STEPS.PASSWORD:
        return yield createKey()
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

function* onPrevStep(): Saga<void> {
  const { currentStep } : CreateKeyData = yield select(selectCreateKey)

  try {
    switch (currentStep) {
      case STEPS.MNEMONIC:
        return null
      case STEPS.CONFIRM:
        return yield onOpen()
      case STEPS.NAME:
        return yield setCurrentStep(STEPS.CONFIRM)
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

function* generateMnemonic() {
  yield put({ type: SET_MNEMONIC, mnemonic: Keystore.generateMnemonic().toString() })

  const isInitialized: boolean = yield isKeyExists()
  gtm.pushCreateAccount('GenerateMnemonic', isInitialized)
}

function* saveMnemonicToFile() {
  const { mnemonic }: CreateKeyData = yield select(selectCreateKey)
  fileSaver.saveTXT(mnemonic, 'jwallet-keystore-mnemonic')

  yield setCurrentStep(STEPS.CONFIRM)

  const isInitialized: boolean = yield isKeyExists()
  gtm.pushCreateAccount('SaveMnemonic', isInitialized)
}

function* checkName() {
  const { name }: CreateKeyData = yield select(selectCreateKey)

  if (!name) {
    throw new InvalidFieldError('name', i18n('routes.createKey.error.name.empty'))
  }

  if (/[^a-z0-9 ]/ig.test(name)) {
    throw new InvalidFieldError('name', i18n('routes.createKey.error.name.invalid'))
  }

  yield checkNameUniq(name)
  yield setCurrentStep(STEPS.PASSWORD)

  const isInitialized: boolean = yield isKeyExists()
  gtm.pushCreateAccount('SetKeyName', isInitialized)
}

function* checkNameUniq(name: string) {
  const keys: Accounts = yield select(selectKeystoreKeys)

  keys.forEach((key: Account) => {
    const newAccountName: string = toLower(name.trim())
    const isEqual: boolean = equals(newAccountName, toLower(key.accountName))

    if (isEqual) {
      throw new InvalidFieldError('name', i18n('routes.createKey.error.name.exists'))
    }
  })
}

function* checkMnemonic() {
  const { mnemonic, mnemonicConfirm }: CreateKeyData = yield select(selectCreateKey)

  if (mnemonic !== mnemonicConfirm) {
    throw new InvalidFieldError(
      'mnemonicConfirm',
      i18n('modals.createAccount.error.mnemonicConfirm.notMatched'),
    )
  }

  yield setCurrentStep(STEPS.NAME)

  const isInitialized: boolean = yield isKeyExists()
  gtm.pushCreateAccount('ConfirmMnemonic', isInitialized)
}

function* createKey() {
  const isInitialized: boolean = yield isKeyExists()
  const { mnemonic, name, password, passwordConfirm }: CreateKeyData = yield select(selectCreateKey)

  if (!isInitialized) {
    yield checkPasswordConfirm(password, passwordConfirm)
  }

  gtm.pushCreateAccount('EnterPassword', isInitialized)

  try {
    const accountId = keystore.createAccount({
      password,
      mnemonic,
      type: 'mnemonic',
      accountName: name.trim(),
    })

    yield createKeySuccess(accountId, isInitialized)
  } catch (err) {
    createKeyError(err)
  }
}

function* createKeySuccess(accountId: AccountId, isInitialized: boolean) {
  yield put({ type: KEYSTORE_CREATE_ACCOUNT, accountId, isInitialized })

  if (isInitialized) {
    yield onClose()
  } else {
    yield setCurrentStep(STEPS.ASSETS)
  }

  gtm.pushCreateAccount('CreateSuccess', isInitialized)
}

function createKeyError(err: { message: string }) {
  throw new InvalidFieldError('password', err.message)
}

function* checkPasswordConfirm(password: Password, passwordConfirm: Password) {
  testKeystorePassword(password)

  if (password !== passwordConfirm) {
    throw new InvalidFieldError(
      'passwordConfirm',
      i18n('modals.general.error.passwordConfirm.notMatched'),
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

function* setInvalidField(fieldName: string, message: string) {
  yield put({ type: SET_INVALID_FIELD, fieldName, message })
}

function* setValidField(fieldName: string, message: string) {
  yield put({ type: SET_VALID_FIELD, fieldName, message })
}

export function* watchOpen(): Saga<void> {
  yield takeEvery(OPEN, onOpen)
}

export function* watchClose(): Saga<void> {
  yield takeEvery(CLOSE, onClose)
}

export function* watchSetNextCreateKeyStep(): Saga<void> {
  yield takeEvery(SET_NEXT_STEP, onNextStep)
}

export function* watchSetPrevCreateKeyStep(): Saga<void> {
  yield takeEvery(SET_PREV_STEP, onPrevStep)
}
