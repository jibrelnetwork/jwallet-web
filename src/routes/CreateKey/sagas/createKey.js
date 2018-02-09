// @flow

import Keystore from 'jwallet-web-keystore'
import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import { InvalidFieldError } from 'utils'
import { fileSaver, gtm, keystore } from 'services'
import { KEYSTORE_CREATE_ACCOUNT } from 'routes/JWallet/modules/keystore'

import {
  SET_NEXT_STEP,
  SET_PREV_STEP,
  SET_STEP_DATA,
  SET_MNEMONIC,
  SET_VALID_FIELD,
  SET_INVALID_FIELD,
  CLEAN,
  STEPS,
} from '../modules/createKey'

function isCurrentAccountExists(state: { keystore: { currentAccountId: AccountId } }): boolean {
  return !!state.keystore.currentAccountId
}

function selectCreateKeyData(state: { createKey: any }): any {
  return state.createKey
}

function* onNextStep(): Saga<void> {
  const data = yield select(selectCreateKeyData)
  const isInitialized = yield select(isCurrentAccountExists)

  try {
    switch (data.currentStep) {
      case STEPS.INIT:
        return yield generateMnemonic(isInitialized)
      case STEPS.MNEMONIC:
        return yield saveMnemonicToFile(data.mnemonic, isInitialized)
      case STEPS.MNEMONIC_CONFIRM:
        return yield checkMnemonic(data, isInitialized)
      case STEPS.PASSWORD:
        return yield createKey(data, isInitialized)
      case STEPS.ASSETS:
        return yield finish()
      default:
        return null
    }
  } catch (err) {
    if (err instanceof InvalidFieldError) {
      yield setInvalidField(err.fieldName, err.message)
    } else {
      console.error(err)
    }

    return null
  }
}

function* onPrevStep(): Saga<void> {
  const data = yield select(selectCreateKeyData)
  const isInitialized = yield select(isCurrentAccountExists)

  try {
    switch (data.currentStep) {
      case STEPS.MNEMONIC:
        return null
      case STEPS.MNEMONIC_CONFIRM:
        return yield generateMnemonic(isInitialized)
      case STEPS.PASSWORD:
        return yield updateStep(STEPS.MNEMONIC_CONFIRM, isInitialized)
      case STEPS.ASSETS:
        return yield updateStep(STEPS.PASSWORD, isInitialized)
      default:
        return null
    }
  } catch (err) {
    if (err instanceof InvalidFieldError) {
      yield setInvalidField(err.fieldName, err.message)
    } else {
      console.error(err)
    }

    return null
  }
}

function* updateStep(nextStep: number, isInitialized: boolean) {
  yield put({
    type: SET_STEP_DATA,
    nextStep,
    alert: getAlert(nextStep, isInitialized),
  })
}

function* generateMnemonic(isInitialized: boolean) {
  gtm.pushCreateAccount('GenerateMnemonic', isInitialized)
  yield put({ type: SET_MNEMONIC, mnemonic: Keystore.generateMnemonic().toString() })
  yield updateStep(STEPS.MNEMONIC, isInitialized)
}

function* saveMnemonicToFile(mnemonic: string, isInitialized: boolean) {
  fileSaver.saveTXT(mnemonic, 'jwallet-keystore-mnemonic')
  gtm.pushCreateAccount('SaveMnemonic', isInitialized)
  yield updateStep(STEPS.MNEMONIC_CONFIRM, isInitialized)
}

function* checkMnemonic(
  data: { mnemonic: string, mnemonicConfirm: string },
  isInitialized: boolean,
) {
  if (data.mnemonic !== data.mnemonicConfirm) {
    throw new InvalidFieldError(
      'mnemonicConfirm',
      i18n('modals.createAccount.error.mnemonicConfirm.notMatched'),
    )
  }

  gtm.pushCreateAccount('ConfirmMnemonic', isInitialized)
  yield updateStep(STEPS.PASSWORD, isInitialized)
}

function* createKey(
  data: { password: Password, passwordConfirm: Password, mnemonic: string },
  isInitialized: boolean,
) {
  const { mnemonic, password, passwordConfirm } = data

  if (!isInitialized) {
    yield checkPasswordConfirm(password, passwordConfirm)
  }

  gtm.pushCreateAccount('EnterPassword', isInitialized)

  try {
    const accountId = keystore.createAccount({ type: 'mnemonic', password, mnemonic })
    yield createKeySuccess(accountId, isInitialized)
  } catch (err) {
    createKeyError(err)
  }
}

function* createKeySuccess(accountId: AccountId, isInitialized: boolean) {
  gtm.pushCreateAccount('CreateSuccess', isInitialized)
  yield put({ type: KEYSTORE_CREATE_ACCOUNT, accountId, isInitialized })
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

function getAlert(nextStep: number, isInitialized: boolean) {
  return i18n(`modals.createAccount.alerts.${nextStep}.${isInitialized ? 'yes' : 'no'}`)
}

function* finish() {
  yield put(push('/'))
  yield put({ type: CLEAN })
}

export function* watchSetNextCreateKeyStep(): Saga<void> {
  yield takeEvery(SET_NEXT_STEP, onNextStep)
}

export function* watchSetPrevCreateKeyStep(): Saga<void> {
  yield takeEvery(SET_PREV_STEP, onPrevStep)
}
