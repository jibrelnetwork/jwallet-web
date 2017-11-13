import { put, takeEvery } from 'redux-saga/effects'
import Keystore from 'jwallet-web-keystore'

import isMnemonicType from 'utils/isMnemonicType'
import { fileSaver, keystore } from 'services'

import {
  IMPORT_KEYSTORE_ACCOUNT_CLOSE_MODAL,
  IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP,
  IMPORT_KEYSTORE_ACCOUNT_SET_STEP_DATA,
  IMPORT_KEYSTORE_ACCOUNT_SET_INVALID_FIELD,
  IMPORT_KEYSTORE_ACCOUNT_SET_ACCOUNT_DATA,
  IMPORT_KEYSTORE_ACCOUNT_CLEAR_DATA,
  IMPORT_KEYSTORE_ACCOUNT_STEPS,
} from '../modules/modals/importKeystoreAccount'

import {
  NEW_KEYSTORE_ACCOUNT_CLOSE_MODAL,
  NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC,
  NEW_KEYSTORE_ACCOUNT_SET_CURRENT_STEP,
  NEW_KEYSTORE_ACCOUNT_SET_STEP_DATA,
  NEW_KEYSTORE_ACCOUNT_SET_INVALID_FIELD,
  NEW_KEYSTORE_ACCOUNT_SET_VALID_FIELD,
  NEW_KEYSTORE_ACCOUNT_CLEAR_DATA,
  NEW_KEYSTORE_ACCOUNT_STEPS,
} from '../modules/modals/newKeystoreAccount'

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
      return yield importKeystoreAccount({
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

  yield put({ type: IMPORT_KEYSTORE_ACCOUNT_SET_ACCOUNT_DATA, accountData: newAccountData })

  if (isMnemonic) {
    return yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT_STEPS.MNEMONIC_OPTIONS, isInitialized)
  }

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

function* importKeystoreAccount(props) {
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
  const isPasswordValid = yield testPassword(password, 'import')
  const isPasswordMatch = (password === passwordConfirm)

  if (!isPasswordMatch) {
    yield setImportInvalidField('passwordConfirm', 'Password should match')
  }

  return (isPasswordValid && isPasswordMatch)
}

function* testPassword(password, type = 'import') {
  const error = Keystore.testPassword(password).errors[0]

  if (error) {
    const args = ['password', error]
    yield (type === 'import') ? setImportInvalidField(...args) : setNewInvalidField(...args)
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

  return onClose ? onClose() : null
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
  const imageName = ['', '', '', 'done']

  return imageName[nextStep]
}

/**
 * New Keystore Account Modal
 */
function* setNewStep(action) {
  const { mnemonic, mnemonicConfirm, isInitialized } = action.props

  switch (action.currentStep) {
    case NEW_KEYSTORE_ACCOUNT_STEPS.BEFORE:
      return yield updateNewStep(NEW_KEYSTORE_ACCOUNT_STEPS.FIRST, isInitialized)
    case NEW_KEYSTORE_ACCOUNT_STEPS.FIRST:
      return yield updateNewStep(NEW_KEYSTORE_ACCOUNT_STEPS.BEFORE_MNEMONIC, isInitialized)
    case NEW_KEYSTORE_ACCOUNT_STEPS.BEFORE_MNEMONIC:
      return yield generateNewMnemonic(isInitialized)
    case NEW_KEYSTORE_ACCOUNT_STEPS.SAVE_MNEMONIC:
      return yield saveMnemonicToFile(mnemonic, isInitialized)
    case NEW_KEYSTORE_ACCOUNT_STEPS.CHECK_MNEMONIC:
      return yield checkMnemonicConfirm(mnemonic, mnemonicConfirm, isInitialized)
    case NEW_KEYSTORE_ACCOUNT_STEPS.BEFORE_PASSWORD:
      return yield updateNewStep(NEW_KEYSTORE_ACCOUNT_STEPS.SET_PASSWORD, isInitialized)
    case NEW_KEYSTORE_ACCOUNT_STEPS.SET_PASSWORD:
      return yield createKeystoreAccount(action.props)
    default:
      return null
  }
}

function* updateNewStep(nextStep, isInitialized) {
  const alert = getNewAlert(nextStep, isInitialized)
  const buttonTitle = getNewButtonTitle(nextStep)
  const imageName = getNewImageName(nextStep)
  const iconName = getNewIconName(nextStep)

  yield put({
    type: NEW_KEYSTORE_ACCOUNT_SET_STEP_DATA,
    alert,
    buttonTitle,
    imageName,
    iconName,
    nextStep,
  })
}

function* generateNewMnemonic(isInitialized) {
  yield put({
    type: NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC,
    mnemonic: Keystore.generateMnemonic().toString(),
  })

  yield updateNewStep(NEW_KEYSTORE_ACCOUNT_STEPS.SAVE_MNEMONIC, isInitialized)
}

function* saveMnemonicToFile(mnemonic, isInitialized) {
  try {
    fileSaver.saveTXT(mnemonic, 'jwallet-keystore-mnemonic')

    yield updateNewStep(NEW_KEYSTORE_ACCOUNT_STEPS.CHECK_MNEMONIC, isInitialized)
  } catch (e) {
    console.error(e)
  }
}

function* createKeystoreAccount(props) {
  try {
    const { onClose, password, passwordConfirm, mnemonic, isInitialized } = props

    if (!isInitialized) {
      const isPasswordConfirmed = yield checkNewPasswordConfirm(password, passwordConfirm)

      if (!isPasswordConfirmed) {
        return
      }
    }

    const accountId = keystore.createAccount({ type: 'mnemonic', password, mnemonic })

    yield put({ type: KEYSTORE_CREATE_ACCOUNT, accountId, isInitialized })
    yield onCreateSuccess(onClose)
  } catch (err) {
    yield onCreateFail(err)
  }
}

function* onCreateSuccess(onClose) {
  yield resetNewModal(onClose)
}

function* onCreateFail(err) {
  yield setNewInvalidField('password', err.message)
}

function* resetNewModal(onClose) {
  yield put({ type: NEW_KEYSTORE_ACCOUNT_CLOSE_MODAL })
  yield put({ type: NEW_KEYSTORE_ACCOUNT_CLEAR_DATA })
  yield generateNewMnemonic(true)

  return onClose ? onClose() : null
}

function* setNewInvalidField(fieldName, message) {
  yield put({ type: NEW_KEYSTORE_ACCOUNT_SET_INVALID_FIELD, fieldName, message })
}

function* setNewValidField(fieldName, message) {
  yield put({ type: NEW_KEYSTORE_ACCOUNT_SET_VALID_FIELD, fieldName, message })
}

function* checkMnemonicConfirm(mnemonic, mnemonicConfirm, isInitialized) {
  if (mnemonic !== mnemonicConfirm) {
    yield setNewInvalidField('mnemonicConfirm', 'Mnemonic should match')

    return
  }

  yield updateNewStep(isInitialized
    ? NEW_KEYSTORE_ACCOUNT_STEPS.SET_PASSWORD
    : NEW_KEYSTORE_ACCOUNT_STEPS.BEFORE_PASSWORD, isInitialized)
}

function* checkNewPasswordConfirm(password, passwordConfirm) {
  const isPasswordValid = yield testPassword(password, 'new')
  const isPasswordMatch = (password === passwordConfirm)

  if (!isPasswordMatch) {
    yield setNewInvalidField('passwordConfirm', 'Password should match')
  } else {
    yield setNewValidField('passwordConfirm', '')
  }

  return (isPasswordValid && isPasswordMatch)
}

function getNewButtonTitle(nextStep) {
  const title = ['I understood', 'I understood', 'Save as TXT', 'Confirm', 'I understood', 'Save']

  return title[nextStep]
}

function getNewAlert(nextStep, isInitialized = false) {
  const alert = [
    'Anyone who has access to your passphrase can spend your money.',
    'Screenshots are not secure. ' +
    'If you save a screenshot, it can be viewed by other applications.',
    'Save your passphrase and move it to a safe place, in the next step we will check it.',
    'Let\'s check your word combination. Enter it in the box below.',
    'Excellent! Keep your passphrase in a safe place. Without it, ' +
    'access to your account may be lost forever.',
    isInitialized
      ? 'Please input your password'
      : 'It\'s time to create a secure password for your wallet.',
  ]

  return alert[nextStep]
}

function getNewImageName(nextStep) {
  const imageName = ['spy', 'screenshot', '', '', 'done', '']

  return imageName[nextStep]
}

function getNewIconName(nextStep) {
  const iconName = ['', '', 'txt', '', '', '']

  return iconName[nextStep]
}

export function* watchSetImportAccountStep() {
  yield takeEvery(IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP, setImportStep)
}

export function* watchSetNewAccountStep() {
  yield takeEvery(NEW_KEYSTORE_ACCOUNT_SET_CURRENT_STEP, setNewStep)
}
