import { put, select, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import Keystore from 'blockchain-wallet-keystore'
import storage from 'local-storage-polyfill'
import fileSaver from 'file-saver'

const keystore = new Keystore()

import {
  KEYSTORE_GET_FROM_STORAGE,
  KEYSTORE_SET_ACCOUNTS,
  KEYSTORE_SET_CURRENT_ACCOUNT,
  KEYSTORE_SET_CURRENT_ACCOUNT_DATA,
  KEYSTORE_CREATE_ACCOUNT,
  KEYSTORE_REMOVE_ACCOUNT,
  KEYSTORE_REMOVE_ACCOUNTS,
  KEYSTORE_SET_ACCOUNT_NAME,
  KEYSTORE_SET_DERIVATION_PATH,
  KEYSTORE_SET_ADDRESS,
  KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC,
  KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC,
  KEYSTORE_SET_PASSWORD,
  KEYSTORE_BACKUP,
} from '../modules/keystore'

function getStateAccountData(state) {
  return state.keystore.accountData
}

function getStateCurrentAccount(state) {
  return state.keystore.currentAccount.id
}

function* getKeystoreFromStorage() {
  try {
    const keystoreData = storage.getItem('keystore')
    const currentAccountId = storage.getItem('keystoreCurrentAccount')

    if (keystoreData) {
      keystore.deserialize(keystoreData)

      yield setAccounts()
    }

    yield setCurrentAccountData(currentAccountId)

    return
  } catch (e) {
    console.error('Cannot parse keystore data from storage')
  }

  yield setAccounts()
}

function setKeystoreToStorage() {
  storage.setItem('keystore', keystore.serialize())
}

function* setAccounts() {
  const accounts = keystore.getAccounts()

  if (accounts && accounts.length) {
    yield put(push('/jwallet'))
  } else {
    yield put(push('/auth'))
  }

  setKeystoreToStorage()

  yield put({ type: KEYSTORE_SET_ACCOUNTS, accounts })
}

function* setCurrentAccountData(accountId) {
  if (!accountId) {
    return yield setFirstAccountAsCurrent()
  }

  const account = keystore.getAccount(accountId)

  if (!account) {
    console.error('Cannot set current account')

    return yield setEmptyCurrentAccount()
  }

  storage.setItem('keystoreCurrentAccount', account.id)

  return yield put({ type: KEYSTORE_SET_CURRENT_ACCOUNT_DATA, currentAccount: account })
}

function* setFirstAccountAsCurrent() {
  const accounts = keystore.getAccounts()

  if (!accounts.length) {
    return yield setEmptyCurrentAccount()
  }

  const firstAccountId = accounts[0].id

  yield setCurrentAccountData(firstAccountId)
}

function* setEmptyCurrentAccount() {
  yield put({ type: KEYSTORE_SET_CURRENT_ACCOUNT_DATA, currentAccount: {} })
}

function* createAccount() {
  const accountData = yield select(getStateAccounts)

  const accountId = keystore.createAccount(accountData)

  yield setAccounts()
  yield setCurrentAccountData(accountId)
}

function* setCurrentAccount(action) {
  yield setCurrentAccountData(action.accountId)
}

function* removeAccount(action) {
  const currentAccountId = yield select(getStateCurrentAccountId)
  const { accountId } = action

  keystore.removeAccount(accountId)

  if (currentAccountId === accountId) {
    yield setFirstAccountAsCurrent()
  }

  yield setAccounts()
}

function* removeAccounts() {
  keystore.removeAccounts()

  yield setAccounts()
  yield setCurrentAccountData()
}

function* setAccountName(action) {
  const { accountId, newName } = action

  keystore.setAccountName(accountId, newName)

  yield setAccounts()
  yield setCurrentAccountData(accountId)
}

function* setDerivationPath(action) {
  const { password, accountId, newDerivationPath } = action

  keystore.setDerivationPath(password, accountId, newDerivationPath)

  yield setAccounts()
  yield setCurrentAccountData(accountId)
}

function* setAddress(action) {
  const { password, accountId, addressIndex } = action

  keystore.setAddress(password, accountId, addressIndex)

  yield setAccounts()
  yield setCurrentAccountData(accountId)
}

function* getAddressesFromMnemonic(action) {
  const { password, accountId, iteration } = action

  const addressesFromMnemonic = keystore.getAddressesFromMnemonic(password, accountId, iteration)

  yield put({ type: KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC, addressesFromMnemonic })
}

function* setPassword(action) {
  const { password, newPassword } = action

  keystore.setPassword(password, newPassword)

  setKeystoreToStorage()
}

function* backupKeystore() {
  try {
    const backupData = new Blob([keystore.serialize()], { type: 'application/json' })
    const timestamp = (new Date()).toString()

    fileSaver.saveAs(backupData, `jwallet-keystore-backup-${timestamp}.json`)
  } catch (e) {
    console.error(e)
  }
}

export function* watchGetKeystoreFromStorage() {
  yield takeEvery(KEYSTORE_GET_FROM_STORAGE, getKeystoreFromStorage)
}

export function* watchCreateAccount() {
  yield takeEvery(KEYSTORE_CREATE_ACCOUNT, createAccount)
}

export function* watchSetCurrentAccount() {
  yield takeEvery(KEYSTORE_SET_CURRENT_ACCOUNT, setCurrentAccount)
}

export function* watchRemoveAccount() {
  yield takeEvery(KEYSTORE_REMOVE_ACCOUNT, removeAccount)
}

export function* watchRemoveAccounts() {
  yield takeEvery(KEYSTORE_REMOVE_ACCOUNTS, removeAccounts)
}

export function* watchSetAccountName() {
  yield takeEvery(KEYSTORE_SET_ACCOUNT_NAME, setAccountName)
}

export function* watchSetDerivationPath() {
  yield takeEvery(KEYSTORE_SET_DERIVATION_PATH, setDerivationPath)
}

export function* watchSetAddress() {
  yield takeEvery(KEYSTORE_SET_ADDRESS, setAddress)
}

export function* watchGetAddressesFromMnemonic() {
  yield takeEvery(KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC, getAddressesFromMnemonic)
}

export function* watchSetPassword() {
  yield takeEvery(KEYSTORE_SET_PASSWORD, setPassword)
}

export function* watchBackupKeystore() {
  yield takeEvery(KEYSTORE_BACKUP, backupKeystore)
}
