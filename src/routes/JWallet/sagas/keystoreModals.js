import Keystore from 'jwallet-web-keystore'
import { put, takeEvery } from 'redux-saga/effects'

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
  NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC_CONFIRM,
  NEW_KEYSTORE_ACCOUNT_SET_CURRENT_STEP,
  NEW_KEYSTORE_ACCOUNT_SET_STEP_DATA,
  NEW_KEYSTORE_ACCOUNT_SET_INVALID_FIELD,
  NEW_KEYSTORE_ACCOUNT_SET_VALID_FIELD,
  NEW_KEYSTORE_ACCOUNT_CLEAR_DATA,
  NEW_KEYSTORE_ACCOUNT_STEPS,
} from '../modules/modals/newKeystoreAccount'

import { KEYSTORE_CREATE_ACCOUNT } from '../modules/keystore'

function* onSetImportStep(action = {}) {
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
    return yield setImportInvalidField('data', i18n('modals.importAccount.error.data.invalid'))
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
    yield onImportFail()
  }
}

function* onImportSuccess(isInitialized) {
  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT_STEPS.SUCCESS, isInitialized)
}

function* onImportFail() {
  yield setImportInvalidField('password', i18n('modals.importAccount.error.password.invalid'))
}

function* checkImportPasswordConfirm(password, passwordConfirm) {
  const isPasswordValid = yield testPassword(password, 'import')
  const isPasswordMatch = (password === passwordConfirm)

  if (!isPasswordMatch) {
    yield setImportInvalidField(
      'passwordConfirm',
      i18n('modals.importAccount.error.passwordConfirm.notMatched'),
    )
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
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT_SET_ACCOUNT_DATA, accountData: {} })

  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT_STEPS.DATA, isInitialized)

  return onClose ? onClose() : null
}

function getImportButtonTitle(nextStep, isInitialized) {
  return i18n(`modals.importAccount.buttonTitles.${nextStep}.${isInitialized ? 'yes' : 'no'}`)
}

function getImportAlert(nextStep, isInitialized) {
  return i18n(`modals.importAccount.alerts.${nextStep}.${isInitialized ? 'yes' : 'no'}`)
}

function getImportImageName(nextStep) {
  const imageNames = ['', '', '', 'done']

  return imageNames[nextStep]
}

/**
 * New Keystore Account Modal
 */
function* onSetNewStep(action) {
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

  yield put({ type: NEW_KEYSTORE_ACCOUNT_SET_MNEMONIC_CONFIRM, mnemonicConfirm: '' })

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

function* onCreateFail() {
  yield setNewInvalidField('password', i18n('modals.createAccount.error.password.invalid'))
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
    yield setNewInvalidField(
      'mnemonicConfirm',
      i18n('modals.createAccount.error.mnemonicConfirm.notMatched'),
    )

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
    yield setNewInvalidField(
      'passwordConfirm',
      i18n('modals.createAccount.error.passwordConfirm.notMatched'),
    )
  } else {
    yield setNewValidField('passwordConfirm', '')
  }

  return (isPasswordValid && isPasswordMatch)
}

function getNewButtonTitle(nextStep) {
  return i18n(`modals.createAccount.buttonTitles.${nextStep}`)
}

function getNewAlert(nextStep, isInitialized) {
  return i18n(`modals.createAccount.alerts.${nextStep}.${isInitialized ? 'yes' : 'no'}`)
}

function getNewImageName(nextStep) {
  const imageNames = ['spy', 'screenshot', '', '', 'done', '']

  return imageNames[nextStep]
}

function getNewIconName(nextStep) {
  const iconNames = ['', '', 'txt', '', '', '']

  return iconNames[nextStep]
}

export function* watchSetImportAccountStep() {
  yield takeEvery(IMPORT_KEYSTORE_ACCOUNT_SET_CURRENT_STEP, onSetImportStep)
}

export function* watchSetNewAccountStep() {
  yield takeEvery(NEW_KEYSTORE_ACCOUNT_SET_CURRENT_STEP, onSetNewStep)
}
