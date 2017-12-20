import Keystore from 'jwallet-web-keystore'
import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { fileSaver, gtm, keystore } from 'services'
import { isMnemonicType, InvalidFieldError } from 'utils'

import * as IMPORT_KEYSTORE_ACCOUNT from '../modules/modals/importKeystoreAccount'
import * as NEW_KEYSTORE_ACCOUNT from '../modules/modals/newKeystoreAccount'
import { KEYSTORE_CREATE_ACCOUNT, KEYSTORE_OPEN_MODAL } from '../modules/keystore'

import {
  selectImportAccountModalData,
  selectNewAccountModalData,
  selectCurrentAccountId,
} from './stateSelectors'

function* onSetImportStep({ currentStep }) {
  const data = yield select(selectImportAccountModalData)
  const isInitialized = !!(yield select(selectCurrentAccountId))

  try {
    switch (currentStep) {
      case IMPORT_KEYSTORE_ACCOUNT.STEPS.BEFORE:
        return yield goToImportDataStep(isInitialized)
      case IMPORT_KEYSTORE_ACCOUNT.STEPS.DATA:
        return yield getImportDataType(data, isInitialized)
      case IMPORT_KEYSTORE_ACCOUNT.STEPS.MNEMONIC_OPTIONS:
        return yield goFromMnemonicOptionsStep()
      case IMPORT_KEYSTORE_ACCOUNT.STEPS.SET_PASSWORD:
        return yield importKeystoreAccount(data, isInitialized)
      case IMPORT_KEYSTORE_ACCOUNT.STEPS.SUCCESS:
        return yield resetImportModal(data, isInitialized)
      default:
        return null
    }
  } catch (err) {
    if (err instanceof InvalidFieldError) {
      yield setImportInvalidField(err.fieldName, err.message)
    } else {
      console.error(err)
    }

    return null
  }
}

function* goToImportDataStep(isInitialized) {
  gtm.pushImportAccount('Start')
  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT.STEPS.DATA, isInitialized)
}

function* getImportDataType({ data, isInitialized }) {
  const newAccountData = getNewAccountData(data)

  gtm.pushImportAccount('SetData', newAccountData.type)

  yield put({ type: IMPORT_KEYSTORE_ACCOUNT.SET_ACCOUNT_DATA, accountData: newAccountData })

  yield updateImportStep(
    isMnemonic(newAccountData)
      ? IMPORT_KEYSTORE_ACCOUNT.STEPS.MNEMONIC_OPTIONS
      : IMPORT_KEYSTORE_ACCOUNT.STEPS.SET_PASSWORD,
    isInitialized,
  )
}

function* goFromMnemonicOptionsStep() {
  gtm.pushImportAccount('ChangeDerivationPath')
  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT.STEPS.SET_PASSWORD)
}

function isMnemonic({ type, isReadOnly }) {
  return (isMnemonicType(type) && !isReadOnly)
}

function getNewAccountData(data) {
  if (Keystore.isMnemonicValid(data)) {
    return { type: 'mnemonic', isReadOnly: false, mnemonic: data }
  } else if (Keystore.isBip32XPublicKeyValid(data)) {
    return { type: 'mnemonic', isReadOnly: true, bip32XPublicKey: data }
  } else if (Keystore.isHexStringValid(data, 64)) {
    return { type: 'address', isReadOnly: false, privateKey: data }
  } else if (Keystore.isHexStringValid(data, 40)) {
    return { type: 'address', isReadOnly: true, address: data }
  }

  throw new InvalidFieldError('data', i18n('modals.importAccount.error.data.invalid'))
}

function* updateImportStep(nextStep, isInitialized) {
  yield put({
    nextStep,
    type: IMPORT_KEYSTORE_ACCOUNT.SET_STEP_DATA,
    imageName: getImportImageName(nextStep),
    alert: getImportAlert(nextStep, isInitialized),
    buttonTitle: getImportButtonTitle(nextStep, isInitialized),
  })
}

function* importKeystoreAccount(props, isInitialized) {
  const { accountData, password, passwordConfirm, derivationPath } = props

  if (!isInitialized) {
    yield checkPassword(password, passwordConfirm)
  }

  gtm.pushImportAccount('EnterPassword', accountData.type)

  try {
    const accountId = keystore.createAccount({ ...accountData, password, derivationPath })
    yield onImportSuccess(accountId, isInitialized)
  } catch (err) {
    yield onImportFail(err.message)
  }
}

function* onImportSuccess(accountId, isInitialized) {
  gtm.pushImportAccount('ImportSuccess')

  yield put({ type: KEYSTORE_CREATE_ACCOUNT, accountId, isInitialized })
  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT.STEPS.SUCCESS, isInitialized)
}

function* onImportFail(errMessage) {
  throw new InvalidFieldError('password', errMessage)
}

function* checkPassword(password, passwordConfirm, type) {
  testKeystorePassword(password)

  if (password !== passwordConfirm) {
    throw new InvalidFieldError(
      'passwordConfirm',
      i18n('modals.general.error.passwordConfirm.notMatched'),
    )
  }

  if (type === 'new') {
    yield setNewValidField('passwordConfirm', '')
  }
}

function testKeystorePassword(password) {
  const error = Keystore.testPassword(password).errors[0]

  if (error) {
    throw new InvalidFieldError('password', error)
  }
}

function* setImportInvalidField(fieldName, message) {
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT.SET_INVALID_FIELD, fieldName, message })
}

function* resetImportModal(isInitialized) {
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT.CLOSE_MODAL })
  yield delay(config.modalOpeningClosingTimeout)
  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT.STEPS.DATA, isInitialized)
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT.CLEAR_DATA })
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT.SET_ACCOUNT_DATA, accountData: {} })
}

function getImportButtonTitle(nextStep, isInitialized) {
  return i18n(`modals.importAccount.buttonTitles.${nextStep}.${isInitialized ? 'yes' : 'no'}`)
}

function getImportAlert(nextStep, isInitialized) {
  return i18n(`modals.importAccount.alerts.${nextStep}.${isInitialized ? 'yes' : 'no'}`)
}

function getImportImageName(nextStep) {
  return ['', '', '', 'done'][nextStep]
}

/**
 * New Keystore Account Modal
 */
function* onSetNewStep({ currentStep }) {
  const data = yield select(selectNewAccountModalData)
  const isInitialized = !!(yield select(selectCurrentAccountId))

  try {
    switch (currentStep) {
      case NEW_KEYSTORE_ACCOUNT.STEPS.BEFORE:
        return yield goToNewFirstStep(isInitialized)
      case NEW_KEYSTORE_ACCOUNT.STEPS.FIRST:
        return yield updateNewStep(NEW_KEYSTORE_ACCOUNT.STEPS.BEFORE_MNEMONIC, isInitialized)
      case NEW_KEYSTORE_ACCOUNT.STEPS.BEFORE_MNEMONIC:
        return yield generateNewMnemonic(isInitialized)
      case NEW_KEYSTORE_ACCOUNT.STEPS.SAVE_MNEMONIC:
        return yield saveMnemonicToFile(data.mnemonic, isInitialized)
      case NEW_KEYSTORE_ACCOUNT.STEPS.CHECK_MNEMONIC:
        return yield checkMnemonicConfirm(data, isInitialized)
      case NEW_KEYSTORE_ACCOUNT.STEPS.BEFORE_PASSWORD:
        return yield updateNewStep(NEW_KEYSTORE_ACCOUNT.STEPS.SET_PASSWORD, isInitialized)
      case NEW_KEYSTORE_ACCOUNT.STEPS.SET_PASSWORD:
        return yield createKeystoreAccount(data, isInitialized)
      default:
        return null
    }
  } catch (err) {
    if (err instanceof InvalidFieldError) {
      yield setNewInvalidField(err.fieldName, err.message)
    } else {
      console.error(err)
    }

    return null
  }
}

function* goToNewFirstStep(isInitialized) {
  gtm.pushCreateAccount('Start')
  yield updateNewStep(NEW_KEYSTORE_ACCOUNT.STEPS.FIRST, isInitialized)
}

function* updateNewStep(nextStep, isInitialized) {
  yield put({
    type: NEW_KEYSTORE_ACCOUNT.SET_STEP_DATA,
    nextStep,
    iconName: getNewIconName(nextStep),
    imageName: getNewImageName(nextStep),
    buttonTitle: getNewButtonTitle(nextStep),
    alert: getNewAlert(nextStep, isInitialized),
  })
}

function* generateNewMnemonic(isInitialized) {
  yield put({
    type: NEW_KEYSTORE_ACCOUNT.SET_MNEMONIC,
    mnemonic: Keystore.generateMnemonic().toString(),
  })

  gtm.pushCreateAccount('GenerateMnemonic')

  yield put({ type: NEW_KEYSTORE_ACCOUNT.SET_MNEMONIC_CONFIRM, mnemonicConfirm: '' })
  yield updateNewStep(NEW_KEYSTORE_ACCOUNT.STEPS.SAVE_MNEMONIC, isInitialized)
}

function* saveMnemonicToFile(mnemonic, isInitialized) {
  fileSaver.saveTXT(mnemonic, 'jwallet-keystore-mnemonic')
  gtm.pushCreateAccount('SaveMnemonic')
  yield updateNewStep(NEW_KEYSTORE_ACCOUNT.STEPS.CHECK_MNEMONIC, isInitialized)
}

function* createKeystoreAccount({ password, passwordConfirm, mnemonic }, isInitialized) {
  if (!isInitialized) {
    yield checkPassword(password, passwordConfirm, 'new')
  }

  gtm.pushCreateAccount('EnterPassword')

  try {
    const accountId = keystore.createAccount({ type: 'mnemonic', password, mnemonic })
    yield onCreateSuccess(accountId, isInitialized)
  } catch (err) {
    onCreateFail(err.message)
  }
}

function* onCreateSuccess(accountId, isInitialized) {
  gtm.pushCreateAccount('CreateSuccess')

  yield put({ type: KEYSTORE_CREATE_ACCOUNT, accountId, isInitialized })
  yield resetNewModal()
}

function onCreateFail(errMessage) {
  throw new InvalidFieldError('password', errMessage)
}

function* resetNewModal() {
  yield put({ type: NEW_KEYSTORE_ACCOUNT.CLOSE_MODAL })
  yield delay(config.modalOpeningClosingTimeout)
  yield put({ type: NEW_KEYSTORE_ACCOUNT.CLEAR_DATA })
  yield generateNewMnemonic(true)
}

function* setNewInvalidField(fieldName, message) {
  yield put({ type: NEW_KEYSTORE_ACCOUNT.SET_INVALID_FIELD, fieldName, message })
}

function* setNewValidField(fieldName, message) {
  yield put({ type: NEW_KEYSTORE_ACCOUNT.SET_VALID_FIELD, fieldName, message })
}

function* checkMnemonicConfirm({ mnemonic, mnemonicConfirm }, isInitialized) {
  if (mnemonic !== mnemonicConfirm) {
    throw new InvalidFieldError(
      'mnemonicConfirm',
      i18n('modals.createAccount.error.mnemonicConfirm.notMatched'),
    )
  }

  gtm.pushCreateAccount('ConfirmMnemonic')

  yield updateNewStep(
    isInitialized
      ? NEW_KEYSTORE_ACCOUNT.STEPS.SET_PASSWORD
      : NEW_KEYSTORE_ACCOUNT.STEPS.BEFORE_PASSWORD,
    isInitialized,
  )
}

function getNewButtonTitle(nextStep) {
  return i18n(`modals.createAccount.buttonTitles.${nextStep}`)
}

function getNewAlert(nextStep, isInitialized) {
  return i18n(`modals.createAccount.alerts.${nextStep}.${isInitialized ? 'yes' : 'no'}`)
}

function getNewImageName(nextStep) {
  return ['spy', 'screenshot', '', '', 'done', ''][nextStep]
}

function getNewIconName(nextStep) {
  return ['', '', 'txt', '', '', ''][nextStep]
}

/**
 * On open keystore modals
 */

function* onOpenImportAccountModal() {
  yield onSetImportStep({ currentStep: IMPORT_KEYSTORE_ACCOUNT.STEPS.BEFORE })
}

function* onOpenNewAccountModal() {
  const isInitialized = !!(yield select(selectCurrentAccountId))

  // start from mnemonic step if keystore already initialized
  yield onSetNewStep({
    currentStep: isInitialized
      ? NEW_KEYSTORE_ACCOUNT.STEPS.BEFORE_MNEMONIC
      : NEW_KEYSTORE_ACCOUNT.STEPS.BEFORE,
  })
}

/**
 * On close keystore modals
 */

function* onCloseImportAccountModal() {
  const { isOpenedFromKeystoreModal } = yield select(selectImportAccountModalData)

  if (isOpenedFromKeystoreModal) {
    yield put({ type: KEYSTORE_OPEN_MODAL })
  }
}

function* onCloseNewAccountModal() {
  const { isOpenedFromKeystoreModal } = yield select(selectNewAccountModalData)

  if (isOpenedFromKeystoreModal) {
    yield put({ type: KEYSTORE_OPEN_MODAL })
  }
}

export function* watchSetImportAccountStep() {
  yield takeEvery(IMPORT_KEYSTORE_ACCOUNT.SET_CURRENT_STEP, onSetImportStep)
}

export function* watchSetNewAccountStep() {
  yield takeEvery(NEW_KEYSTORE_ACCOUNT.SET_CURRENT_STEP, onSetNewStep)
}

export function* watchOpenImportAccountModal() {
  yield takeEvery(IMPORT_KEYSTORE_ACCOUNT.OPEN_MODAL, onOpenImportAccountModal)
}

export function* watchOpenNewAccountModal() {
  yield takeEvery(NEW_KEYSTORE_ACCOUNT.OPEN_MODAL, onOpenNewAccountModal)
}

export function* watchCloseImportAccountModal() {
  yield takeEvery(IMPORT_KEYSTORE_ACCOUNT.CLOSE_MODAL, onCloseImportAccountModal)
}

export function* watchCloseNewAccountModal() {
  yield takeEvery(NEW_KEYSTORE_ACCOUNT.CLOSE_MODAL, onCloseNewAccountModal)
}
