// @flow

import config from 'config'

const { addressesPerIteration } = config

export const KEYSTORE_GET_FROM_STORAGE = 'KEYSTORE_GET_FROM_STORAGE'
export const KEYSTORE_SET_ACCOUNTS = 'KEYSTORE_SET_ACCOUNTS'
export const KEYSTORE_SET_CURRENT_ACCOUNT = 'KEYSTORE_SET_CURRENT_ACCOUNT'
export const KEYSTORE_SET_CURRENT_ACCOUNT_DATA = 'KEYSTORE_SET_CURRENT_ACCOUNT_DATA'
export const KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA = 'KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA'
export const KEYSTORE_CREATE_ACCOUNT = 'KEYSTORE_CREATE_ACCOUNT'
export const KEYSTORE_REMOVE_ACCOUNT = 'KEYSTORE_REMOVE_ACCOUNT'
export const KEYSTORE_REMOVE_ACCOUNTS = 'KEYSTORE_REMOVE_ACCOUNTS'
export const KEYSTORE_SET_ACCOUNT_NAME = 'KEYSTORE_SET_ACCOUNT_NAME'
export const KEYSTORE_SET_DERIVATION_PATH = 'KEYSTORE_SET_DERIVATION_PATH'
export const KEYSTORE_SET_ADDRESS_INDEX = 'KEYSTORE_SET_ADDRESS_INDEX'
export const KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC = 'KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC'
export const KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC = 'KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC'
export const KEYSTORE_SET_PASSWORD = 'KEYSTORE_SET_PASSWORD'
export const KEYSTORE_SORT_ACCOUNTS = 'KEYSTORE_SORT_ACCOUNTS'
export const KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS = 'KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS'
export const KEYSTORE_BACKUP = 'KEYSTORE_BACKUP'

export const KEYSTORE_OPEN_MODAL = 'KEYSTORE_OPEN_MODAL'
export const KEYSTORE_CLOSE_MODAL = 'KEYSTORE_CLOSE_MODAL'

export const KEYSTORE_SET_EDIT_ACCOUNT_NAME = 'KEYSTORE_SET_EDIT_ACCOUNT_NAME'
export const KEYSTORE_SET_NEW_ACCOUNT_NAME = 'KEYSTORE_SET_NEW_ACCOUNT_NAME'

export function getKeystoreFromStorage() {
  return {
    type: KEYSTORE_GET_FROM_STORAGE,
  }
}

export function createKeystoreAccount(props: any = {}) {
  return {
    type: KEYSTORE_CREATE_ACCOUNT,
    props,
  }
}

export function setCurrentKeystoreAccount(accountId: AccountId) {
  return {
    type: KEYSTORE_SET_CURRENT_ACCOUNT,
    accountId,
  }
}

export function removeKeystoreAccount(accountId: AccountId) {
  return {
    type: KEYSTORE_REMOVE_ACCOUNT,
    accountId,
  }
}

export function removeKeystoreAccounts() {
  return {
    type: KEYSTORE_REMOVE_ACCOUNTS,
  }
}

export function setKeystoreAccountName(
  accountId: AccountId = '',
  newName: string = '',
  onSuccess: any = null,
  onError: any = null,
) {
  return {
    type: KEYSTORE_SET_ACCOUNT_NAME,
    accountId,
    newName,
    onSuccess,
    onError,
  }
}

export function setKeystoreAccountDerivationPath() {
  return {
    type: KEYSTORE_SET_DERIVATION_PATH,
  }
}

export function setKeystoreAccountAddressIndex(
  accountId: AccountId = '',
  addressIndex: Index = 0,
) {
  return {
    type: KEYSTORE_SET_ADDRESS_INDEX,
    accountId,
    addressIndex,
  }
}

export function getKeystoreAddressesFromMnemonic(
  accountId: AccountId = '',
  iteration: number = 0,
  limit: number = addressesPerIteration,
) {
  return {
    type: KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC,
    accountId,
    iteration,
    limit,
  }
}

export function setKeystorePassword(
  password: string = '',
  newPassword: string = '',
  onSuccess: any = null,
  onError: any = null
) {
  return {
    type: KEYSTORE_SET_PASSWORD,
    password,
    newPassword,
    onSuccess,
    onError,
  }
}

export function sortAccounts(sortField: string = 'name') {
  return {
    type: KEYSTORE_SORT_ACCOUNTS,
    sortField,
  }
}

export function setSortAccountsOptions(sortField: string = 'name', sortDirection: string = 'ASC') {
  return {
    type: KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS,
    sortField,
    sortDirection,
  }
}

export function backupKeystore(password: string = '') {
  return {
    type: KEYSTORE_BACKUP,
    password,
  }
}

export function openKeystoreModal() {
  return {
    type: KEYSTORE_OPEN_MODAL,
  }
}

export function closeKeystoreModal() {
  return {
    type: KEYSTORE_CLOSE_MODAL,
  }
}

/**
 * Editing of account name
 */
export function setEditAccountName(accountId: string = '', newAccountName: string = '') {
  return {
    type: KEYSTORE_SET_EDIT_ACCOUNT_NAME,
    accountId,
    newAccountName,
  }
}

export function setNewAccountName(newAccountName: string = '') {
  return {
    type: KEYSTORE_SET_NEW_ACCOUNT_NAME,
    newAccountName,
  }
}

const ACTION_HANDLERS = {
  [KEYSTORE_GET_FROM_STORAGE]: state => ({
    ...state,
    accounts: [],
    currentAccount: initialState.currentAccount,
    isLoading: true,
  }),
  [KEYSTORE_SET_ACCOUNTS]: (state, action) => ({
    ...state,
    accounts: action.accounts,
  }),
  [KEYSTORE_SET_CURRENT_ACCOUNT_DATA]: (state, action) => ({
    ...state,
    currentAccount: {
      ...state.currentAccount,
      ...action.currentAccount,
    },
    isLoading: false,
    isCreating: false,
  }),
  [KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA]: state => ({
    ...state,
    currentAccount: initialState.currentAccount,
    isLoading: false,
  }),
  [KEYSTORE_SET_ACCOUNT_NAME]: state => ({
    ...state,
    newAccountNameData: initialState.newAccountNameData,
  }),
  [KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC]: state => ({
    ...state,
    isLoading: true,
  }),
  [KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC]: (state, action) => ({
    ...state,
    addressesFromMnemonic: {
      items: action.items,
      currentIteration: action.currentIteration,
    },
    isLoading: false,
  }),
  [KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS]: (state, action) => ({
    ...state,
    sortField: action.sortField,
    sortDirection: action.sortDirection,
  }),
  [KEYSTORE_OPEN_MODAL]: state => ({
    ...state,
    isOpen: true,
  }),
  [KEYSTORE_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
  }),
  /**
   * Editing of account name
   */
  [KEYSTORE_SET_EDIT_ACCOUNT_NAME]: (state, action) => ({
    ...state,
    newAccountNameData: {
      ...state.newAccountNameData,
      accountId: action.accountId,
      newAccountName: action.newAccountName,
    },
  }),
  [KEYSTORE_SET_NEW_ACCOUNT_NAME]: (state, action) => ({
    ...state,
    newAccountNameData: {
      ...state.newAccountNameData,
      newAccountName: action.newAccountName,
    },
  }),
}

const initialState = {
  currentAccount: {
    encrypted: {
      privateKey: {},
      mnemonic: {},
      hdPath: {},
    },
    id: '',
    type: '',
    accountName: '',
    address: '',
    addressIndex: 0,
    derivationPath: '',
    bip32XPublicKey: '',
    isReadOnly: false,
  },
  newAccountNameData: {
    accountId: '',
    newAccountName: '',
  },
  addressesFromMnemonic: {
    items: [],
    currentIteration: 0,
  },
  accounts: [],
  sortField: '',
  sortDirection: 'ASC',
  isLoading: true,
  isCreating: false,
  isOpen: false,
}

export default function keystore(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
