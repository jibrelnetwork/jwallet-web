import { put, select, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import Keystore from 'blockchain-wallet-keystore'
import storage from 'local-storage-polyfill'
import fileSaver from 'file-saver'

import { sortItems } from 'utils'

import {
  KEYSTORE_GET_FROM_STORAGE,
  KEYSTORE_SET_ACCOUNTS,
  KEYSTORE_SET_CURRENT_ACCOUNT,
  KEYSTORE_SET_CURRENT_ACCOUNT_DATA,
  KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA,
  KEYSTORE_CREATE_ACCOUNT,
  KEYSTORE_REMOVE_ACCOUNT,
  KEYSTORE_REMOVE_ACCOUNTS,
  KEYSTORE_SET_ACCOUNT_NAME,
  KEYSTORE_SET_DERIVATION_PATH,
  KEYSTORE_SET_ADDRESS,
  KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC,
  KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC,
  KEYSTORE_SET_PASSWORD,
  KEYSTORE_SAVE_MNEMONIC_TO_FILE,
  KEYSTORE_BACKUP,
  KEYSTORE_SORT_ACCOUNTS,
  KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS,
  KEYSTORE_CLOSE_MODAL,
} from '../modules/keystore'

const keystore = new Keystore({ scryptParams: { N: 2 ** 14, r: 8, p: 1 } })

function getStateKeystore(state) {
  return state.keystore
}

function getStateCurrentAccountId(state) {
  return state.keystore.currentAccount.id
}

function* getKeystoreFromStorage() {
  try {
    const keystoreData = storage.getItem('keystore')
    const currentAccountId = storage.getItem('keystoreCurrentAccount')

    if (keystoreData) {
      keystore.deserialize(keystoreData)
    }

    yield setCurrentAccountData(currentAccountId)
  } catch (e) {
    console.error('Cannot parse keystore data from storage') // eslint-disable-line no-console
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
    yield put({ type: KEYSTORE_CLOSE_MODAL })
  }

  setKeystoreToStorage()

  return yield put({ type: KEYSTORE_SET_ACCOUNTS, accounts })
}

function* setCurrentAccountData(accountId) {
  if (!accountId) {
    return yield setFirstAccountAsCurrent()
  }

  const account = keystore.getAccount({ id: accountId })

  if (!account) {
    return yield setEmptyCurrentAccount()
  }

  storage.setItem('keystoreCurrentAccount', account.id)

  yield put({ type: KEYSTORE_SET_CURRENT_ACCOUNT_DATA, currentAccount: account })
}

function* setFirstAccountAsCurrent() {
  const accounts = keystore.getAccounts()

  if (!accounts.length) {
    return yield setEmptyCurrentAccount()
  }

  const firstAccountId = accounts[0].id

  return yield setCurrentAccountData(firstAccountId)
}

function* setEmptyCurrentAccount() {
  storage.removeItem('keystoreCurrentAccount')

  yield put({ type: KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA })
}

function* createAccount(action) {
  const { props, onSuccess, onError } = action

  try {
    const accountId = keystore.createAccount(props)

    yield setAccounts()
    yield setCurrentAccountData(accountId)

    return onSuccess ? onSuccess(accountId) : null
  } catch (e) {
    return onError ? onError(e) : console.error(e) // eslint-disable-line no-console
  }
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

function setPassword(action) {
  const { password, newPassword } = action

  keystore.setPassword(password, newPassword)

  setKeystoreToStorage()
}

function saveMnemonicToFile(action) {
  const { mnemonic, onSuccess, onError } = action

  try {
    const data = new Blob([mnemonic], { type: 'plain/text', endings: 'native' })
    const timestamp = getTimestamp()

    fileSaver.saveAs(data, `jwallet-keystore-mnemonic ${timestamp}.txt`)

    return onSuccess ? onSuccess() : null
  } catch (e) {
    return onError ? onError(e) : console.error(e) // eslint-disable-line no-console
  }
}

function backupKeystore(action) {
  try {
    const decryptedAccounts = keystore.getDecryptedAccounts(action.password)
    const backupData = new Blob([decryptedAccounts], { type: 'plain/text', endings: 'native' })
    const timestamp = getTimestamp()

    fileSaver.saveAs(backupData, `jwallet-keystore-backup ${timestamp}.json`)
  } catch (e) {
    console.error(e) // eslint-disable-line no-console
  }
}

function getTimestamp() {
  return (new Date()).toString()
}

function* sortAccounts(action) {
  const keystore = yield select(getStateKeystore)

  const oldSortField = keystore.sortField
  const sortField = action.sortField || oldSortField
  const { accounts, sortDirection } = keystore

  const result = sortItems(accounts, oldSortField, sortField, sortDirection)

  yield put({ type: KEYSTORE_SET_ACCOUNTS, accounts: result.items })

  yield put({
    type: KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS,
    sortField: result.sortField,
    sortDirection: result.sortDirection,
  })
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

export function* watchSaveMnemonicToFile() {
  yield takeEvery(KEYSTORE_SAVE_MNEMONIC_TO_FILE, saveMnemonicToFile)
}

export function* watchSortAccounts() {
  yield takeEvery(KEYSTORE_SORT_ACCOUNTS, sortAccounts)
}
