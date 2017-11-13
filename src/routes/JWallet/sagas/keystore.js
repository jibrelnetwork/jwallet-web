import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { fileSaver, keystore, storage } from 'services'
import sortItems from 'utils/sortItems'

import {
  selectKeystoreData,
  selectCurrentAccountId,
  selectClearKeystoreData,
} from './stateSelectors'

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
  KEYSTORE_SET_ADDRESS_INDEX,
  KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC,
  KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC,
  KEYSTORE_SET_PASSWORD,
  KEYSTORE_BACKUP,
  KEYSTORE_SORT_ACCOUNTS,
  KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS,
  KEYSTORE_CLOSE_MODAL,
} from '../modules/keystore'

import {
  CLEAR_KEYSTORE_CLOSE_MODAL,
  CLEAR_KEYSTORE_SET_INVALID_FIELD,
} from '../modules/modals/clearKeystore'

import { CURRENCIES_GET_BALANCES } from '../modules/currencies'
import { TRANSACTIONS_GET } from '../modules/transactions'

const { addressesPerIteration } = config

function* getKeystoreFromStorage() {
  try {
    const keystoreData = storage.getKeystore()
    const currentAccountId = storage.getKeystoreCurrentAccount()

    if (keystoreData) {
      keystore.deserialize(keystoreData)
    }

    yield setCurrentAccount({ accountId: currentAccountId })
  } catch (e) {
    console.error('Cannot parse keystore data from storage') // eslint-disable-line no-console
  }

  yield setAccounts()
}

function setKeystoreToStorage() {
  storage.setKeystore(keystore.serialize())
}

function setCurrentAccountToStorage(accountId) {
  storage.setKeystoreCurrentAccount(accountId)
}

function* setAccounts() {
  // Need to clone keystore accounts array to re-render if it was changed
  const accounts = [...keystore.getAccounts()]

  setKeystoreToStorage()

  return yield put({ type: KEYSTORE_SET_ACCOUNTS, accounts })
}

function getAccountData(accountId) {
  return keystore.getAccount({ id: accountId })
}

function* setCurrentAccountData(currentAccount) {
  yield put({ type: KEYSTORE_SET_CURRENT_ACCOUNT_DATA, currentAccount })
}

function* getBalances() {
  yield put({ type: CURRENCIES_GET_BALANCES })
}

function* getTransactions() {
  yield put({ type: TRANSACTIONS_GET })
}

function* updateCurrentAccountData() {
  const currentAccountId = yield select(selectCurrentAccountId)
  const accountData = getAccountData(currentAccountId)

  yield setCurrentAccountData(accountData)
}

function* setFirstAccountAsCurrent() {
  const accounts = keystore.getAccounts()
  const firstAccountId = (accounts && accounts.length && accounts[0]) ? accounts[0].id : null

  if (!firstAccountId) {
    return yield clearCurrentAccount()
  }

  return yield setCurrentAccount({ accountId: firstAccountId })
}

function* clearCurrentAccount() {
  storage.removeKeystoreCurrentAccount()
  storage.removeKeystoreAddressesFromMnemonic()

  yield put({ type: KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA })
  yield put({ type: KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC, items: [], currentIteration: 0 })
}

function* createAccount(action) {
  const { accountId, isInitialised } = action

  yield setAccounts()

  if (!isInitialised) {
    yield setCurrentAccount({ accountId })
  }
}

function* setCurrentAccount(action) {
  const currentAccountId = yield select(selectCurrentAccountId)
  const { accountId } = action

  if (currentAccountId === accountId) {
    return null
  }

  const accountData = accountId ? getAccountData(accountId) : null

  if (!accountData) {
    return yield setFirstAccountAsCurrent()
  }

  const { type, addressIndex } = accountData

  yield setCurrentAccountData(accountData)

  if (type === 'mnemonic') {
    yield refreshAddressesFromMnemonic(accountId, addressIndex)
  }

  yield getBalances()
  yield getTransactions()

  return setCurrentAccountToStorage(accountId)
}

function* removeAccount(action) {
  const currentAccountId = yield select(selectCurrentAccountId)
  const { accountId } = action

  keystore.removeAccount(accountId)

  yield closeKeystoreModal()

  if (currentAccountId === accountId) {
    yield setFirstAccountAsCurrent()
  }

  yield setAccounts()
}

function* closeKeystoreModal() {
  if (!keystore.getAccounts().length) {
    yield put({ type: KEYSTORE_CLOSE_MODAL })
  }
}

function* onRemoveAccounts(action) {
  try {
    keystore.removeAccounts(action.password)

    yield onRemoveAccountsSuccess()
  } catch (err) {
    yield onRemoveAccountsError(err.message)
  }
}

function* onRemoveAccountsSuccess() {
  yield setAccounts()
  yield clearCurrentAccount()

  yield put({ type: CLEAR_KEYSTORE_CLOSE_MODAL })
}

function* onRemoveAccountsError(errMessage) {
  yield put({ type: CLEAR_KEYSTORE_SET_INVALID_FIELD, fieldName: 'password', message: errMessage })
}

function* setAccountName(action) {
  const { accountId, newName, onSuccess, onError } = action

  try {
    keystore.setAccountName(accountId, newName)

    yield setAccounts()
    yield updateCurrentAccountData()

    return onSuccess ? onSuccess() : null
  } catch (e) {
    return onError ? onError(e) : null
  }
}

function* setDerivationPath(action) {
  const { password, accountId, newDerivationPath, onSuccess, onError } = action

  try {
    keystore.setDerivationPath(password, accountId, newDerivationPath)
    const accountData = getAccountData(accountId)

    yield setAccounts()
    yield refreshAddressesFromMnemonic(accountId, accountData.addressIndex)

    return onSuccess ? onSuccess() : null
  } catch (e) {
    return onError ? onError(e) : null
  }
}

function* setAddressIndex(action) {
  const { accountId, addressIndex } = action

  keystore.setAddressIndex(accountId, addressIndex)

  yield setAccounts()
  yield updateCurrentAccountData()
  yield getBalances()
}

function* refreshAddressesFromMnemonic(accountId, addressIndex = 0) {
  storage.removeKeystoreAddressesFromMnemonic()

  yield setAddressesFromMnemonic()

  const limit = addressesPerIteration
  let iteration = 0

  while (addressIndex >= (iteration * limit)) {
    yield getAddressesFromMnemonic({ accountId, iteration, limit })

    iteration += 1

    // to prevent infinite loop
    if (iteration > 1000) {
      return
    }
  }
}

function* getAddressesFromMnemonic(action) {
  const { addressesFromMnemonic } = yield select(selectKeystoreData)
  const { accountId, iteration, limit } = action
  const existedItems = addressesFromMnemonic.items

  const addressesFromStorage = getAddressesFromStorage(iteration, limit)
  const isFromStorage = !!addressesFromStorage

  const newItems = isFromStorage
    ? addressesFromStorage
    : keystore.getAddressesFromMnemonic(accountId, iteration, limit)

  yield setAddressesFromMnemonic(existedItems, newItems, iteration)

  if (!isFromStorage) {
    setAddressesToStorage(newItems)
  }
}

function getAddressesFromStorage(iteration = -1, limit = addressesPerIteration) {
  const addresses = storage.getKeystoreAddressesFromMnemonic()

  if (!addresses) {
    return null
  }

  const parsedAddresses = JSON.parse(addresses)
  const isFound = (parsedAddresses.length > (iteration * limit))

  if (!isFound) {
    return null
  }

  // return all found results if iteration parameter was not passed
  if (iteration === -1) {
    return parsedAddresses
  }

  const startIndex = (iteration * limit)
  const endIndex = (startIndex + limit)
  const foundItems = []

  for (let i = startIndex; i < endIndex; i += 1) {
    foundItems.push(parsedAddresses[i])
  }

  return foundItems
}

function* setAddressesFromMnemonic(existedItems = [], newItems = [], iteration = -1) {
  yield put({
    type: KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC,
    items: [...existedItems, ...newItems],
    currentIteration: (iteration + 1),
  })
}

function setAddressesToStorage(newItems = []) {
  const addresses = storage.getKeystoreAddressesFromMnemonic()
  const parsedAddresses = !addresses ? [] : JSON.parse(addresses)
  const newAddresses = [...parsedAddresses, ...newItems]

  storage.setKeystoreAddressesFromMnemonic(JSON.stringify(newAddresses))
}

function setPassword(action) {
  const { password, newPassword, onSuccess, onError } = action

  try {
    keystore.setPassword(password, newPassword)

    setKeystoreToStorage()

    return onSuccess ? onSuccess() : null
  } catch (e) {
    return onError ? onError(e) : null
  }
}

function backupKeystore(action) {
  const { password, onSuccess, onError } = action

  try {
    fileSaver.saveJSON(keystore.getDecryptedAccounts(password), 'jwallet-keystore-backup')

    return onSuccess ? onSuccess() : null
  } catch (e) {
    return onError ? onError(e) : null
  }
}

function* sortAccounts(action) {
  const keystoreData = yield select(selectKeystoreData)

  const oldSortField = keystoreData.sortField
  const sortField = action.sortField || oldSortField
  const { accounts, sortDirection } = keystoreData

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
  yield takeEvery(KEYSTORE_REMOVE_ACCOUNTS, onRemoveAccounts)
}

export function* watchSetAccountName() {
  yield takeEvery(KEYSTORE_SET_ACCOUNT_NAME, setAccountName)
}

export function* watchSetDerivationPath() {
  yield takeEvery(KEYSTORE_SET_DERIVATION_PATH, setDerivationPath)
}

export function* watchSetAddressIndex() {
  yield takeEvery(KEYSTORE_SET_ADDRESS_INDEX, setAddressIndex)
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

export function* watchSortAccounts() {
  yield takeEvery(KEYSTORE_SORT_ACCOUNTS, sortAccounts)
}
