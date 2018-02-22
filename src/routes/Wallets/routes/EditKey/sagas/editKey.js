// @flow

import { head } from 'ramda'
import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import { keystore, storage } from 'services'
import { selectKeystoreKeys, selectEditKey, selectCurrentKeyId } from 'store/stateSelectors'

import {
  isMnemonicType,
  validateKeyName,
  validateDerivationPath,
  InvalidFieldError,
} from 'utils'

import {
  KEYSTORE_SET_ACCOUNTS,
  KEYSTORE_SET_CURRENT_ACCOUNT_DATA,
  KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA,
} from 'routes/JWallet/modules/keystore'

import {
  OPEN,
  SET_KEY_ID,
  SET_IS_MNEMONIC,
  SET_INVALID_FIELD,
  GO_TO_PASSWORD_STEP,
  SET_CURRENT_STEP,
  SAVE,
  REMOVE,
  CLEAN,
  STEPS,
} from '../modules/editKey'

function* onOpen(action: { keyId: AccountId }): Saga<void> {
  try {
    const { id }: Account = keystore.getWallet(action.keyId)
    yield setKeyId(id)
  } catch (err) {
    // console.error(err)
    yield openEditCurrentKey()
  }
}

function* onGoToPasswordStep(): Saga<void> {
  try {
    const editKeyData: EditKeyData = yield select(selectEditKey)
    const { keyId, name }: EditKeyData = editKeyData
    const { customType }: Account = keystore.getWallet(keyId)

    /**
     * If wallet type is not full mnemonic we should just update its name,
     * otherwise we should check name & derivationPath and then ask for password
     */
    if (!isMnemonicType(customType)) {
      const keys: Accounts = yield select(selectKeystoreKeys)
      validateKeyName(editKeyData.name, keys)
      setKeyName(keyId, name)
      yield onSaveSuccess(keyId)
    } else {
      yield checkEditData(editKeyData)
    }
  } catch (err) {
    yield onGoToPasswordStepError(err)
  }
}

function* onGoToPasswordStepError(err: InvalidFieldError) {
  if (err instanceof InvalidFieldError) {
    yield setInvalidField(err.fieldName, err.message)
  }

  // console.error(err)
}

function* onSave(): Saga<void> {
  try {
    const data: EditKeyData = yield select(selectEditKey)
    const { keyId, name, password }: EditKeyData = data
    const derivationPath: string = data.customDerivationPath || data.knownDerivationPath

    setKeyName(keyId, name)
    setDerivationPath(password, keyId, derivationPath)

    yield onSaveSuccess(keyId)
  } catch (err) {
    yield onSaveError(err)
  }
}

function* onSaveSuccess(keyId: AccountId) {
  yield put(push('/'))
  yield put({ type: CLEAN })
  yield updateKeystoreKeys()
  yield updateKeystoreCurrentKey(keyId)

  // TODO: show notification about successful key change
}

function* onSaveError(err: InvalidFieldError) {
  yield setInvalidField('password', err.message)
}

function* onRemove(): Saga<void> {
  try {
    const { keyId }: EditKeyData = yield select(selectEditKey)
    keystore.removeWallet(keyId)
    yield onRemoveSuccess(keyId)
  } catch (err) {
    // console.error(err)
  }
}

function* onRemoveSuccess(keyId: AccountId) {
  yield put(push('/'))
  yield put({ type: CLEAN })
  yield updateKeystoreKeys()
  yield updateKeystoreCurrentKey(keyId)

  // TODO: show notification about successful key remove
}

function* openEditCurrentKey() {
  const currentKeyId = yield select(selectCurrentKeyId)
  yield put(push(`/keys/edit/${currentKeyId}`))
  yield setKeyId(currentKeyId)
}

function* updateKeystoreKeys() {
  const wallets = keystore.getWallets()
  yield put({ type: KEYSTORE_SET_ACCOUNTS, accounts: wallets })
  storage.setKeystore(keystore.serialize())
}

function* updateKeystoreCurrentKey(walletId: AccountId) {
  try {
    const wallet = keystore.getWallet(walletId)
    yield setKeystoreCurrentKeyData(wallet)
  } catch (err) {
    const firstWallet = head(keystore.getWallets())

    if (firstWallet) {
      yield setKeystoreCurrentKeyData(firstWallet)

      return
    }

    yield goToStart()
  }
}

function* goToStart() {
  yield put({ type: KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA })
  yield put(push('/keys/start'))
  storage.removeKeystoreCurrentAccount()
}

function* setKeystoreCurrentKeyData(key: Account) {
  yield put({ type: KEYSTORE_SET_CURRENT_ACCOUNT_DATA, currentAccount: key })
  storage.setKeystoreCurrentAccount(key.id)
}

function setKeyName(walletId: AccountId, name: string) {
  try {
    keystore.setWalletName(walletId, name)
  } catch (err) {
    throw new InvalidFieldError('name', err.message)
  }
}

function setDerivationPath(password: Password, walletId: AccountId, derivationPath: string) {
  try {
    keystore.setDerivationPath(password, walletId, derivationPath)
  } catch (err) {
    throw new InvalidFieldError('derivationPath', err.message)
  }
}

function* setKeyId(keyId: AccountId) {
  yield setIsMnemonic(keyId)
  yield put({ type: SET_KEY_ID, keyId })
}

function* setIsMnemonic(walletId: AccountId) {
  const { customType }: Account = keystore.getWallet(walletId)
  yield put({ type: SET_IS_MNEMONIC, isMnemonic: isMnemonicType(customType) })
}

function* checkEditData(editKeyData: EditKeyData) {
  const keys: Accounts = yield select(selectKeystoreKeys)

  validateKeyName(editKeyData.name, keys)
  validateDerivationPath(editKeyData)

  yield put({ type: SET_CURRENT_STEP, currentStep: STEPS.PASSWORD })
}

function* setInvalidField(fieldName: string, message: string) {
  yield put({ type: SET_INVALID_FIELD, fieldName, message })
}

export function* watchEditKeyOpen(): Saga<void> {
  yield takeEvery(OPEN, onOpen)
}

export function* watchEditKeyGoToPasswordStep(): Saga<void> {
  yield takeEvery(GO_TO_PASSWORD_STEP, onGoToPasswordStep)
}

export function* watchEditKeySave(): Saga<void> {
  yield takeEvery(SAVE, onSave)
}

export function* watchEditKeyRemove(): Saga<void> {
  yield takeEvery(REMOVE, onRemove)
}
