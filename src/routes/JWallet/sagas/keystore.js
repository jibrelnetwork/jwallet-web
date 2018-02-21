// @flow

import { put, select, takeEvery } from 'redux-saga/effects'
import isEmpty from 'lodash/isEmpty'

import config from 'config'
import { sortItems, isMnemonicType } from 'utils'
import { gtm, keystore, storage } from 'services'

import {
  selectKeystoreData,
  selectCurrentAccountId,
  selectNewDerivationPathModalData,
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
  KEYSTORE_SORT_ACCOUNTS,
  KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS,
  KEYSTORE_OPEN_MODAL,
  KEYSTORE_CLOSE_MODAL,
} from '../modules/keystore'

import { TRANSACTIONS_GET } from '../modules/transactions'
import { CLEAR_KEYSTORE_CLOSE_MODAL } from '../modules/modals/clearKeystore'
import { CURRENCIES_SET_BALANCES, CURRENCIES_GET_BALANCES } from '../modules/currencies'
import * as NEW_DERIVATION_PATH from '../modules/modals/newDerivationPath'

const { addressesPerIteration } = config

function* getKeystoreFromStorage(): Saga<void> {
  try {
    const keystoreData = storage.getKeystore()
    const currentAccountId = storage.getKeystoreCurrentAccount()

    if (keystoreData) {
      keystore.deserialize(keystoreData)
    }

    yield setCurrentAccount({ accountId: currentAccountId })
  } catch (err) {
    // console.error(err)
  }

  yield setAccounts()
}

function* onCreateAccount(action: { accountId: AccountId, isInitialised: boolean }): Saga<void> {
  yield setAccounts()

  if (!action.isInitialised) {
    yield setCurrentAccount({ accountId: action.accountId })
  }
}

function setKeystoreToStorage() {
  storage.setKeystore(keystore.serialize())
}

function setCurrentAccountToStorage(accountId: AccountId) {
  storage.setKeystoreCurrentAccount(accountId)
}

function* setAccounts() {
  const wallets = keystore.getWallets()

  setKeystoreToStorage()

  yield put({ type: KEYSTORE_SET_ACCOUNTS, accounts: wallets })

  if (isEmpty(wallets)) {
    yield put({ type: CURRENCIES_SET_BALANCES, balances: {} })
  }
}

function* setCurrentAccountData(currentAccount: Account) {
  yield put({ type: KEYSTORE_SET_CURRENT_ACCOUNT_DATA, currentAccount })
}

function* getBalances() {
  yield put({ type: CURRENCIES_GET_BALANCES })
}

function* getTransactions() {
  yield put({ type: TRANSACTIONS_GET })
}

function* updateCurrentAccountData() {
  try {
    const walletId = yield select(selectCurrentAccountId)
    const wallet = keystore.getWallet(walletId)
    yield setCurrentAccountData(wallet)
  } catch (err) {
    // console.error(err)
  }
}

function* setFirstAccountAsCurrent() {
  const wallets = keystore.getWallets()
  const firstWalletId = (isEmpty(wallets) || isEmpty(wallets[0])) ? null : wallets[0].id

  if (!firstWalletId) {
    return yield clearCurrentAccount()
  }

  return yield setCurrentAccount({ accountId: firstWalletId })
}

function* clearCurrentAccount() {
  storage.removeKeystoreCurrentAccount()
  storage.removeKeystoreAddressesFromMnemonic()

  yield put({ type: KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA })
  yield put({ type: KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC, items: [], currentIteration: 0 })
}

function* setCurrentAccount(action: { accountId: AccountId }): Saga<void> {
  const walletId = yield select(selectCurrentAccountId)
  const { accountId } = action

  if (walletId === accountId) {
    return
  }

  try {
    const wallet = keystore.getWallet(accountId)
    const { type, addressIndex } = wallet

    yield setCurrentAccountData(wallet)

    if (isMnemonicType(type)) {
      yield refreshAddressesFromMnemonic(accountId, addressIndex)
    }

    yield onCurrentAddressChange()

    setCurrentAccountToStorage(accountId)
  } catch (err) {
    // console.error(err)
    yield setFirstAccountAsCurrent()
  }
}

function* onCurrentAddressChange() {
  yield getBalances()
  yield getTransactions()
}

function* onRemoveAccount(action: { accountId: AccountId }): Saga<void> {
  const currentAccountId = yield select(selectCurrentAccountId)
  const { accountId } = action

  try {
    const { customType } = keystore.removeWallet(accountId)
    gtm.pushRemoveAccountSuccess(customType)
  } catch (err) {
    // console.error(err)
  }

  yield closeKeystoreModal()

  if (currentAccountId === accountId) {
    yield setFirstAccountAsCurrent()
  }

  yield setAccounts()
}

function* closeKeystoreModal() {
  if (!keystore.getWallets().length) {
    yield put({ type: KEYSTORE_CLOSE_MODAL })
  }
}

function* onRemoveAccounts(): Saga<void> {
  try {
    keystore.removeWallets()
    gtm.pushClearKeystore()

    yield onRemoveAccountsSuccess()
  } catch (err) {
    // console.error(err)
  }
}

function* onRemoveAccountsSuccess() {
  yield setAccounts()
  yield clearCurrentAccount()

  yield put({ type: CLEAR_KEYSTORE_CLOSE_MODAL })
}

function* setAccountName(action): Saga<void> {
  const { accountId, newName, onSuccess, onError } = action

  try {
    keystore.setWalletName(accountId, newName)

    yield setAccounts()
    yield updateCurrentAccountData()

    return onSuccess ? onSuccess() : null
  } catch (err) {
    return onError ? onError(err) : null
  }
}

function* onSetDerivationPath(): Saga<void> {
  const derivationPathData = yield select(selectNewDerivationPathModalData)
  const { password, accountId, customDerivationPath, knownDerivationPath } = derivationPathData
  const newDerivationPath = customDerivationPath || knownDerivationPath

  try {
    keystore.setDerivationPath(password, accountId, newDerivationPath)
    const { addressIndex } = keystore.getWallet(accountId)

    yield setAccounts()
    yield refreshAddressesFromMnemonic(accountId, addressIndex)

    yield onSetDerivationPathSuccess()
  } catch (err) {
    // console.error(err)
    yield onSetDerivationPathError(err.message)
  }
}

function* onSetDerivationPathSuccess() {
  gtm.pushSetDerivationPathSuccess()
  yield put({ type: NEW_DERIVATION_PATH.CLOSE_MODAL })
}

function* onSetDerivationPathError(errMessage: string) {
  const isPasswordError = /password/ig.test(errMessage)

  yield put({
    type: NEW_DERIVATION_PATH.SET_INVALID_FIELD,
    fieldName: isPasswordError ? 'password' : 'customDerivationPath',
    message: isPasswordError
      ? i18n('modals.general.error.password.invalid')
      : getDerivationPathError(errMessage),
  })
}

function* onCloseDerivationPathModal(): Saga<void> {
  const data = yield select(selectNewDerivationPathModalData)

  if (data.isOpenedFromKeystoreModal) {
    yield put({ type: KEYSTORE_OPEN_MODAL })
  }
}

function getDerivationPathError(message: string) {
  return /same/ig.test(message)
    ? i18n('modals.derivationPath.error.customDerivationPath.same')
    : i18n('modals.derivationPath.error.customDerivationPath.invalid')
}

function* setAddressIndex(action: { accountId: AccountId, addressIndex: Index }): Saga<void> {
  const { accountId, addressIndex } = action

  keystore.setAddressIndex(accountId, addressIndex)

  yield setAccounts()
  yield updateCurrentAccountData()
  yield onCurrentAddressChange()
}

function* refreshAddressesFromMnemonic(accountId: AccountId, addressIndex: Index) {
  storage.removeKeystoreAddressesFromMnemonic()

  yield setAddressesFromMnemonic([], [], 0)

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

function* getAddressesFromMnemonic(action: {
  accountId: AccountId,
  iteration: number,
  limit: number,
}): Saga<void> {
  const { addressesFromMnemonic } = yield select(selectKeystoreData)
  const { accountId, iteration, limit } = action
  const existedItems = addressesFromMnemonic.items

  const addressesFromStorage = getAddressesFromStorage(iteration, limit)
  const isFromStorage = !isEmpty(addressesFromStorage)

  const newItems = isFromStorage
    ? addressesFromStorage
    : keystore.getAddressesFromMnemonic(accountId, iteration, limit)

  yield setAddressesFromMnemonic(existedItems, newItems, iteration)

  if (!isFromStorage) {
    setAddressesToStorage(newItems)
  }
}

function getAddressesFromStorage(iteration: number, limit: number): Addresses {
  const addresses = storage.getKeystoreAddressesFromMnemonic()

  if (!addresses) {
    return []
  }

  const parsedAddresses = JSON.parse(addresses)
  const isFound = (parsedAddresses.length > (iteration * limit))

  if (!isFound) {
    return []
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

function* setAddressesFromMnemonic(
  existedItems: Addresses,
  newItems: Addresses,
  iteration: number,
) {
  yield put({
    type: KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC,
    items: [...existedItems, ...newItems],
    currentIteration: (iteration + 1),
  })
}

function setAddressesToStorage(newItems: Addresses) {
  const addresses = storage.getKeystoreAddressesFromMnemonic()
  const parsedAddresses = !addresses ? [] : JSON.parse(addresses)
  const newAddresses = [...parsedAddresses, ...newItems]

  storage.setKeystoreAddressesFromMnemonic(JSON.stringify(newAddresses))
}

function* onSetPassword({ password, newPassword, onSuccess, onError }): Saga<void> {
  try {
    const walletId = yield select(selectCurrentAccountId)
    keystore.setPassword(password, newPassword, walletId)
    gtm.pushChangePassword()
    setKeystoreToStorage()

    return onSuccess ? onSuccess() : null
  } catch (err) {
    return onError ? onError(err) : null
  }
}

function* sortAccounts(action: { sortField: string }): Saga<void> {
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

export function* watchGetKeystoreFromStorage(): Saga<void> {
  yield takeEvery(KEYSTORE_GET_FROM_STORAGE, getKeystoreFromStorage)
}

export function* watchCreateAccount(): Saga<void> {
  yield takeEvery(KEYSTORE_CREATE_ACCOUNT, onCreateAccount)
}

export function* watchSetCurrentAccount(): Saga<void> {
  yield takeEvery(KEYSTORE_SET_CURRENT_ACCOUNT, setCurrentAccount)
}

export function* watchRemoveAccount(): Saga<void> {
  yield takeEvery(KEYSTORE_REMOVE_ACCOUNT, onRemoveAccount)
}

export function* watchRemoveAccounts(): Saga<void> {
  yield takeEvery(KEYSTORE_REMOVE_ACCOUNTS, onRemoveAccounts)
}

export function* watchSetAccountName(): Saga<void> {
  yield takeEvery(KEYSTORE_SET_ACCOUNT_NAME, setAccountName)
}

export function* watchSetDerivationPath(): Saga<void> {
  yield takeEvery(KEYSTORE_SET_DERIVATION_PATH, onSetDerivationPath)
}

export function* watchCloseDerivationPath(): Saga<void> {
  yield takeEvery(NEW_DERIVATION_PATH.CLOSE_MODAL, onCloseDerivationPathModal)
}

export function* watchSetAddressIndex(): Saga<void> {
  yield takeEvery(KEYSTORE_SET_ADDRESS_INDEX, setAddressIndex)
}

export function* watchGetAddressesFromMnemonic(): Saga<void> {
  yield takeEvery(KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC, getAddressesFromMnemonic)
}

export function* watchSetPassword(): Saga<void> {
  yield takeEvery(KEYSTORE_SET_PASSWORD, onSetPassword)
}

export function* watchSortAccounts(): Saga<void> {
  yield takeEvery(KEYSTORE_SORT_ACCOUNTS, sortAccounts)
}
