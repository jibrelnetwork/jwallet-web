import { put, takeEvery } from 'redux-saga/effects'
import Keystore from 'jwallet-web-keystore'

import isMnemonicType from 'utils/isMnemonicType'
import keystore from 'services/keystore'

import {
  IMPORT_KEYSTORE_ACCOUNT_CLOSE_MODAL,
  IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP,
  IMPORT_KEYSTORE_ACCOUNT_SET_STEP_DATA,
  IMPORT_KEYSTORE_ACCOUNT_SET_INVALID_FIELD,
  IMPORT_KEYSTORE_ACCOUNT_SET_ACCOUNT_DATA,
  IMPORT_KEYSTORE_ACCOUNT_CLEAR_DATA,
  IMPORT_KEYSTORE_ACCOUNT_STEPS,
} from '../modules/modals/importKeystoreAccount'

import { KEYSTORE_CREATE_ACCOUNT } from '../modules/keystore'

function* setImportStep(action = {}) {
  const {
    onClose,
    accountData,
    data,
    password,
    passwordConfirm,
    derivationPath,
    isInitialized,
  } = action.props

  switch (action.currentStep) {
    case IMPORT_KEYSTORE_ACCOUNT_STEPS.BEFORE:
      return yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT_STEPS.DATA, isInitialized)
    case IMPORT_KEYSTORE_ACCOUNT_STEPS.DATA:
      return yield getImportDataType(data, isInitialized)
    case IMPORT_KEYSTORE_ACCOUNT_STEPS.MNEMONIC_OPTIONS:
      return yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT_STEPS.SET_PASSWORD)
    case IMPORT_KEYSTORE_ACCOUNT_STEPS.SET_PASSWORD:
      return yield createKeystoreAccount({
        accountData,
        password,
        passwordConfirm,
        derivationPath,
        isInitialized,
      })
    case IMPORT_KEYSTORE_ACCOUNT_STEPS.SUCCESS:
      return yield resetImportModal(onClose, isInitialized)
    default:
      return null
  }
}

function* getImportDataType(data, isInitialized) {
  const newAccountData = {}

  if (Keystore.isMnemonicValid(data)) {
    newAccountData.type = 'mnemonic'
    newAccountData.isReadOnly = false
    newAccountData.mnemonic = data
  } else if (Keystore.isBip32XPublicKeyValid(data)) {
    newAccountData.type = 'mnemonic'
    newAccountData.isReadOnly = true
    newAccountData.bip32XPublicKey = data
  } else if (Keystore.isHexStringValid(data, 64)) {
    newAccountData.type = 'address'
    newAccountData.isReadOnly = false
    newAccountData.privateKey = data
  } else if (Keystore.isHexStringValid(data, 40)) {
    newAccountData.type = 'address'
    newAccountData.isReadOnly = true
    newAccountData.address = data
  } else {
    return yield setImportInvalidField('data', 'Please input correct data to import')
  }

  const isMnemonic = (isMnemonicType(newAccountData.type) && (!newAccountData.isReadOnly))

  if (isMnemonic) {
    return yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT_STEPS.MNEMONIC_OPTIONS, isInitialized)
  }

  yield put({ type: IMPORT_KEYSTORE_ACCOUNT_SET_ACCOUNT_DATA, accountData: newAccountData })

  return yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT_STEPS.SET_PASSWORD, isInitialized)
}

function* updateImportStep(nextStep, isInitialized) {
  const alert = getImportAlert(nextStep, isInitialized)
  const buttonTitle = getImportButtonTitle(nextStep, isInitialized)
  const imageName = getImportImageName(nextStep)

  yield put({
    type: IMPORT_KEYSTORE_ACCOUNT_SET_STEP_DATA,
    alert,
    buttonTitle,
    imageName,
    nextStep,
  })
}

function* createKeystoreAccount(props) {
  const { accountData, password, passwordConfirm, derivationPath, isInitialized } = props

  try {
    if (!isInitialized) {
      const isPasswordConfirmed = yield checkImportPasswordConfirm(password, passwordConfirm)

      if (!isPasswordConfirmed) {
        return
      }
    }

    const accountId = keystore.createAccount({ ...accountData, password, derivationPath })

    yield put({ type: KEYSTORE_CREATE_ACCOUNT, accountId, isInitialized })
    yield onImportSuccess(isInitialized)
  } catch (err) {
    yield onImportFail(err)
  }
}

function* onImportSuccess(isInitialized) {
  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT_STEPS.SUCCESS, isInitialized)
}

function* onImportFail(err) {
  yield setImportInvalidField('password', err.message)
}

function* checkImportPasswordConfirm(password, passwordConfirm) {
  const isPasswordValid = yield testPassword(password)
  const isPasswordMatch = (password === passwordConfirm)

  if (!isPasswordMatch) {
    yield setImportInvalidField('passwordConfirm', 'Password should match')
  }

  return (isPasswordValid && isPasswordMatch)
}

function* testPassword(password) {
  const error = Keystore.testPassword(password).errors[0]

  if (error) {
    yield setImportInvalidField('password', error)
  }

  return !error
}

function* setImportInvalidField(fieldName, message) {
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT_SET_INVALID_FIELD, fieldName, message })
}

function* resetImportModal(onClose, isInitialized) {
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT_CLOSE_MODAL })
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT_CLEAR_DATA })
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT_SET_ACCOUNT_DATA })

  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT_STEPS.DATA, isInitialized)

  onClose()
}

function getImportButtonTitle(nextStep, isInitialized = false) {
  const title = [
    'Continue',
    'Continue',
    'Save',
    isInitialized ? 'OK' : 'I understood',
  ]

  return title[nextStep]
}

function getImportAlert(nextStep, isInitialized) {
  const alert = [
    'Please input data for your key. It will be stored only in your browser.',
    'Now you can set custom options for keys derivation from your mnemonic.',
    isInitialized
      ? 'Please input your password'
      : 'It\'s time to create a secure password for your wallet.',
    isInitialized
      ? 'Your key has been successfully imported'
      : 'Excellent! Keep your password in a safe place. Without it, ' +
        'you will not be able to use jWallet.',
  ]

  return alert[nextStep]
}

function getImportImageName(nextStep) {
  const imageName = ['', '', '', 'plane']

  return imageName[nextStep]
}

export function* watchReceiveFundsAccountId() {
  yield takeEvery(IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP, setImportStep)
}
