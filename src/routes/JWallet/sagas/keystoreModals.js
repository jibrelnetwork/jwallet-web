// @flow

import Keystore from 'jwallet-web-keystore'
import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { fileSaver, gtm, keystore } from 'services'
import { getKeystoreAccountType, isMnemonicType, InvalidFieldError } from 'utils'

import * as IMPORT_KEYSTORE_ACCOUNT from '../modules/modals/importKeystoreAccount'
import * as NEW_KEYSTORE_ACCOUNT from '../modules/modals/newKeystoreAccount'
import { KEYSTORE_CREATE_ACCOUNT, KEYSTORE_OPEN_MODAL } from '../modules/keystore'

import {
  selectImportAccountModalData,
  selectNewAccountModalData,
  selectCurrentAccountId,
} from './stateSelectors'

function* onSetImportStep(action: { currentStep: number }) {
  const data = yield select(selectImportAccountModalData)
  const isInitialized = !!(yield select(selectCurrentAccountId))

  try {
    switch (action.currentStep) {
      case IMPORT_KEYSTORE_ACCOUNT.STEPS.BEFORE:
        return yield goToImportDataStep(isInitialized)
      case IMPORT_KEYSTORE_ACCOUNT.STEPS.DATA:
        return yield getImportDataType(data, isInitialized)
      case IMPORT_KEYSTORE_ACCOUNT.STEPS.MNEMONIC_OPTIONS:
        return yield goFromMnemonicOptionsStep(data.accountData, isInitialized)
      case IMPORT_KEYSTORE_ACCOUNT.STEPS.SET_PASSWORD:
        return yield importKeystoreAccount(data, isInitialized)
      case IMPORT_KEYSTORE_ACCOUNT.STEPS.SUCCESS:
        return yield resetImportModal(isInitialized)
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

function* goToImportDataStep(isInitialized: boolean) {
  gtm.pushImportAccount('Start', undefined, isInitialized)
  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT.STEPS.DATA, isInitialized)
}

function* getImportDataType(data: { data: string }, isInitialized: boolean) {
  const newAccountData = getNewAccountData(data.data)

  gtm.pushImportAccount('SetData', getKeystoreAccountType(newAccountData), isInitialized)

  yield put({ type: IMPORT_KEYSTORE_ACCOUNT.SET_ACCOUNT_DATA, accountData: newAccountData })

  yield updateImportStep(
    isMnemonic(newAccountData)
      ? IMPORT_KEYSTORE_ACCOUNT.STEPS.MNEMONIC_OPTIONS
      : IMPORT_KEYSTORE_ACCOUNT.STEPS.SET_PASSWORD,
    isInitialized,
  )
}

function* goFromMnemonicOptionsStep(accountData: NewAccountData, isInitialized: boolean) {
  gtm.pushImportAccount('ChangeDerivationPath', getKeystoreAccountType(accountData), isInitialized)
  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT.STEPS.SET_PASSWORD, false)
}

function isMnemonic(data: { type: string, isReadOnly: boolean }) {
  return (isMnemonicType(data.type) && !data.isReadOnly)
}

function getNewAccountData(data: string) {
  if (Keystore.isMnemonicValid(data)) {
    return { type: 'mnemonic', isReadOnly: false, mnemonic: data }
  } else if (Keystore.isBip32XPublicKeyValid(data)) {
    return { type: 'mnemonic', isReadOnly: true, bip32XPublicKey: data }
  } else if (Keystore.isValidPrivateKey(data)) {
    return { type: 'address', isReadOnly: false, privateKey: data }
  } else if (Keystore.isValidAddress(data)) {
    return { type: 'address', isReadOnly: true, address: data }
  }

  throw new InvalidFieldError('data', i18n('modals.importAccount.error.data.invalid'))
}

function* updateImportStep(nextStep: number, isInitialized: boolean) {
  yield put({
    nextStep,
    type: IMPORT_KEYSTORE_ACCOUNT.SET_STEP_DATA,
    imageName: getImportImageName(nextStep),
    alert: getImportAlert(nextStep, isInitialized),
    buttonTitle: getImportButtonTitle(nextStep, isInitialized),
  })
}

function* importKeystoreAccount(
  props: {
    accountData: NewAccountData,
    password: string,
    passwordConfirm: string,
    derivationPath: string,
  },
  isInitialized: boolean,
) {
  const { accountData, password, passwordConfirm, derivationPath } = props

  if (!isInitialized) {
    yield checkPassword(password, passwordConfirm, '')
  }

  gtm.pushImportAccount('EnterPassword', getKeystoreAccountType(accountData), isInitialized)

  try {
    const accountId = keystore.createAccount({ ...accountData, password, derivationPath })
    yield onImportSuccess(accountId, accountData, isInitialized)
  } catch (err) {
    yield onImportFail(err.message)
  }
}

function* onImportSuccess(
  accountId: AccountId,
  accountData: NewAccountData,
  isInitialized: boolean,
) {
  gtm.pushImportAccount('ImportSuccess', getKeystoreAccountType(accountData), isInitialized)

  yield put({ type: KEYSTORE_CREATE_ACCOUNT, accountId, isInitialized })
  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT.STEPS.SUCCESS, isInitialized)
}

function onImportFail(errMessage: string) {
  throw new InvalidFieldError('password', errMessage)
}

function* checkPassword(password: string, passwordConfirm: string, type: string) {
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

function testKeystorePassword(password: string) {
  const error = Keystore.testPassword(password).errors[0]

  if (error) {
    throw new InvalidFieldError('password', error)
  }
}

function* setImportInvalidField(fieldName: string, message: string) {
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT.SET_INVALID_FIELD, fieldName, message })
}

function* resetImportModal(isInitialized: boolean) {
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT.CLOSE_MODAL })
  yield delay(config.modalOpeningClosingTimeout)
  yield updateImportStep(IMPORT_KEYSTORE_ACCOUNT.STEPS.DATA, isInitialized)
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT.CLEAR_DATA })
  yield put({ type: IMPORT_KEYSTORE_ACCOUNT.SET_ACCOUNT_DATA, accountData: {} })
}

function getImportButtonTitle(nextStep: number, isInitialized: boolean) {
  return i18n(`modals.importAccount.buttonTitles.${nextStep}.${isInitialized ? 'yes' : 'no'}`)
}

function getImportAlert(nextStep: number, isInitialized: boolean) {
  return i18n(`modals.importAccount.alerts.${nextStep}.${isInitialized ? 'yes' : 'no'}`)
}

function getImportImageName(nextStep: number) {
  return ['', '', '', 'done'][nextStep]
}

/**
 * New Keystore Account Modal
 */
function* onSetNewStep(action: { currentStep: number }) {
  const data = yield select(selectNewAccountModalData)
  const isInitialized = !!(yield select(selectCurrentAccountId))

  try {
    switch (action.currentStep) {
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

function* goToNewFirstStep(isInitialized: boolean) {
  gtm.pushCreateAccount('Start', isInitialized)
  yield updateNewStep(NEW_KEYSTORE_ACCOUNT.STEPS.FIRST, isInitialized)
}

function* updateNewStep(nextStep: number, isInitialized: boolean) {
  yield put({
    type: NEW_KEYSTORE_ACCOUNT.SET_STEP_DATA,
    nextStep,
    iconName: getNewIconName(nextStep),
    imageName: getNewImageName(nextStep),
    buttonTitle: getNewButtonTitle(nextStep),
    alert: getNewAlert(nextStep, isInitialized),
  })
}

function* generateNewMnemonic(isInitialized: boolean) {
  yield put({
    type: NEW_KEYSTORE_ACCOUNT.SET_MNEMONIC,
    mnemonic: Keystore.generateMnemonic().toString(),
  })

  gtm.pushCreateAccount('GenerateMnemonic', isInitialized)

  yield put({ type: NEW_KEYSTORE_ACCOUNT.SET_MNEMONIC_CONFIRM, mnemonicConfirm: '' })
  yield updateNewStep(NEW_KEYSTORE_ACCOUNT.STEPS.SAVE_MNEMONIC, isInitialized)
}

function* saveMnemonicToFile(mnemonic: string, isInitialized: boolean) {
  fileSaver.saveTXT(mnemonic, 'jwallet-keystore-mnemonic')
  gtm.pushCreateAccount('SaveMnemonic', isInitialized)
  yield updateNewStep(NEW_KEYSTORE_ACCOUNT.STEPS.CHECK_MNEMONIC, isInitialized)
}

function* createKeystoreAccount(
  data: { password: string, passwordConfirm: string, mnemonic: string },
  isInitialized: boolean,
) {
  const { password, passwordConfirm, mnemonic } = data

  if (!isInitialized) {
    yield checkPassword(password, passwordConfirm, 'new')
  }

  gtm.pushCreateAccount('EnterPassword', isInitialized)

  try {
    const accountId = keystore.createAccount({ type: 'mnemonic', password, mnemonic })
    yield onCreateSuccess(accountId, isInitialized)
  } catch (err) {
    onCreateFail(err.message)
  }
}

function* onCreateSuccess(accountId: AccountId, isInitialized: boolean) {
  gtm.pushCreateAccount('CreateSuccess', isInitialized)

  yield put({ type: KEYSTORE_CREATE_ACCOUNT, accountId, isInitialized })
  yield resetNewModal()
}

function onCreateFail(errMessage: string) {
  throw new InvalidFieldError('password', errMessage)
}

function* resetNewModal() {
  yield put({ type: NEW_KEYSTORE_ACCOUNT.CLOSE_MODAL })
  yield delay(config.modalOpeningClosingTimeout)
  yield put({ type: NEW_KEYSTORE_ACCOUNT.CLEAR_DATA })
  yield generateNewMnemonic(true)
}

function* setNewInvalidField(fieldName: string, message: string) {
  yield put({ type: NEW_KEYSTORE_ACCOUNT.SET_INVALID_FIELD, fieldName, message })
}

function* setNewValidField(fieldName: string, message: string) {
  yield put({ type: NEW_KEYSTORE_ACCOUNT.SET_VALID_FIELD, fieldName, message })
}

function* checkMnemonicConfirm(
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

  yield updateNewStep(
    isInitialized
      ? NEW_KEYSTORE_ACCOUNT.STEPS.SET_PASSWORD
      : NEW_KEYSTORE_ACCOUNT.STEPS.BEFORE_PASSWORD,
    isInitialized,
  )
}

function getNewButtonTitle(nextStep: number) {
  return i18n(`modals.createAccount.buttonTitles.${nextStep}`)
}

function getNewAlert(nextStep: number, isInitialized: boolean) {
  return i18n(`modals.createAccount.alerts.${nextStep}.${isInitialized ? 'yes' : 'no'}`)
}

function getNewImageName(nextStep: number) {
  return ['spy', 'screenshot', '', '', 'done', ''][nextStep]
}

function getNewIconName(nextStep: number) {
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

export function* watchSetImportAccountStep(): Saga<void> {
  yield takeEvery(IMPORT_KEYSTORE_ACCOUNT.SET_CURRENT_STEP, onSetImportStep)
}

export function* watchSetNewAccountStep(): Saga<void> {
  yield takeEvery(NEW_KEYSTORE_ACCOUNT.SET_CURRENT_STEP, onSetNewStep)
}

export function* watchOpenImportAccountModal(): Saga<void> {
  yield takeEvery(IMPORT_KEYSTORE_ACCOUNT.OPEN_MODAL, onOpenImportAccountModal)
}

export function* watchOpenNewAccountModal(): Saga<void> {
  yield takeEvery(NEW_KEYSTORE_ACCOUNT.OPEN_MODAL, onOpenNewAccountModal)
}

export function* watchCloseImportAccountModal(): Saga<void> {
  yield takeEvery(IMPORT_KEYSTORE_ACCOUNT.CLOSE_MODAL, onCloseImportAccountModal)
}

export function* watchCloseNewAccountModal(): Saga<void> {
  yield takeEvery(NEW_KEYSTORE_ACCOUNT.CLOSE_MODAL, onCloseNewAccountModal)
}
