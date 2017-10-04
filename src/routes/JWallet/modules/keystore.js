export const KEYSTORE_GET_FROM_STORAGE = 'KEYSTORE_GET_FROM_STORAGE'
export const KEYSTORE_SET_ACCOUNTS = 'KEYSTORE_SET_ACCOUNTS'
export const KEYSTORE_SET_CURRENT_ACCOUNT = 'KEYSTORE_SET_CURRENT_ACCOUNT'
export const KEYSTORE_SET_CURRENT_ACCOUNT_DATA = 'KEYSTORE_SET_CURRENT_ACCOUNT_DATA'
export const KEYSTORE_CREATE_ACCOUNT = 'KEYSTORE_CREATE_ACCOUNT'
export const KEYSTORE_REMOVE_ACCOUNT = 'KEYSTORE_REMOVE_ACCOUNT'
export const KEYSTORE_REMOVE_ACCOUNTS = 'KEYSTORE_REMOVE_ACCOUNTS'
export const KEYSTORE_SET_ACCOUNT_NAME = 'KEYSTORE_SET_ACCOUNT_NAME'
export const KEYSTORE_SET_DERIVATION_PATH = 'KEYSTORE_SET_DERIVATION_PATH'
export const KEYSTORE_SET_ADDRESS = 'KEYSTORE_SET_ADDRESS'
export const KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC = 'KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC'
export const KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC = 'KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC'
export const KEYSTORE_SET_PASSWORD = 'KEYSTORE_SET_PASSWORD'

export const KEYSTORE_OPEN_MODAL = 'KEYSTORE_OPEN_MODAL'
export const KEYSTORE_CLOSE_MODAL = 'KEYSTORE_CLOSE_MODAL'

export const KEYSTORE_OPEN_NEW_KEY_MODAL = 'KEYSTORE_OPEN_NEW_KEY_MODAL'
export const KEYSTORE_CLOSE_NEW_KEY_MODAL = 'KEYSTORE_CLOSE_NEW_KEY_MODAL'
export const KEYSTORE_SET_NEW_KEY_MNEMONIC = 'KEYSTORE_SET_NEW_KEY_MNEMONIC'
export const KEYSTORE_SET_NEW_KEY_MNEMONIC_CONFIRM = 'KEYSTORE_SET_NEW_KEY_MNEMONIC_CONFIRM'
export const KEYSTORE_SET_NEW_KEY_PASSWORD = 'KEYSTORE_SET_NEW_KEY_PASSWORD'
export const KEYSTORE_SET_NEW_KEY_PASSWORD_CONFIRM = 'KEYSTORE_SET_NEW_KEY_PASSWORD_CONFIRM'

export const KEYSTORE_OPEN_IMPORT_KEY_MODAL = 'KEYSTORE_OPEN_IMPORT_KEY_MODAL'
export const KEYSTORE_CLOSE_IMPORT_KEY_MODAL = 'KEYSTORE_CLOSE_IMPORT_KEY_MODAL'
export const KEYSTORE_SET_IMPORT_KEY_DATA = 'KEYSTORE_SET_IMPORT_KEY_DATA'
export const KEYSTORE_SET_IMPORT_KEY_PASSWORD = 'KEYSTORE_SET_IMPORT_KEY_PASSWORD'
export const KEYSTORE_SET_IMPORT_KEY_PASSWORD_CONFIRM = 'KEYSTORE_SET_IMPORT_KEY_PASSWORD_CONFIRM'

export const KEYSTORE_OPEN_BACKUP_MODAL = 'KEYSTORE_OPEN_BACKUP_MODAL'
export const KEYSTORE_CLOSE_BACKUP_MODAL = 'KEYSTORE_CLOSE_BACKUP_MODAL'
export const KEYSTORE_SET_BACKUP_PASSWORD = 'KEYSTORE_SET_BACKUP_PASSWORD'
export const KEYSTORE_BACKUP = 'KEYSTORE_BACKUP'

export function getKeystoreFromStorage() {
  return {
    type: KEYSTORE_GET_FROM_STORAGE,
  }
}

export function createKeystoreAccount() {
  return {
    type: KEYSTORE_CREATE_ACCOUNT,
  }
}

export function setCurrentKeystoreAccount(accountId) {
  return {
    type: KEYSTORE_SET_CURRENT_ACCOUNT,
    accountId,
  }
}

export function removeKeystoreAccount(accountId) {
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

export function setKeystoreAccountName(accountId, newName) {
  return {
    type: KEYSTORE_SET_ACCOUNT_NAME,
    accountId,
    newName,
  }
}

export function setKeystoreAccountDerivationPath(password, accountId, newDerivationPath) {
  return {
    type: KEYSTORE_SET_DERIVATION_PATH,
    password,
    accountId,
    newDerivationPath,
  }
}

export function setKeystoreAccountAddress(password, accountId, addressIndex) {
  return {
    type: KEYSTORE_SET_ADDRESS,
    password,
    accountId,
    addressIndex,
  }
}

export function getKeystoreAddressesFromMnemonic(password, accountId, iteration) {
  return {
    type: KEYSTORE_GET_ADDRESSES_FROM_MNEMONIC,
    password,
    accountId,
    iteration,
  }
}

export function setKeystorePassword(password, newPassword) {
  return {
    type: KEYSTORE_SET_PASSWORD,
    password,
    newPassword,
  }
}

/**
 * Modals
 */
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

export function openNewKeyModal() {
  return {
    type: KEYSTORE_OPEN_NEW_KEY_MODAL,
  }
}

export function closeNewKeyModal() {
  return {
    type: KEYSTORE_CLOSE_NEW_KEY_MODAL,
  }
}

export function setNewKeyMnemonic(mnemonic) {
  return {
    type: KEYSTORE_SET_NEW_KEY_MNEMONIC,
    mnemonic,
  }
}

export function setNewKeyMnemonicConfirm(mnemonicConfirm) {
  return {
    type: KEYSTORE_SET_NEW_KEY_MNEMONIC_CONFIRM,
    mnemonicConfirm,
  }
}

export function setNewKeyPassword(password) {
  return {
    type: KEYSTORE_SET_NEW_KEY_PASSWORD,
    password,
  }
}

export function setNewKeyPasswordConfirm(passwordConfirm) {
  return {
    type: KEYSTORE_SET_NEW_KEY_PASSWORD_CONFIRM,
    passwordConfirm,
  }
}

export function openImportKeyModal() {
  return {
    type: KEYSTORE_OPEN_IMPORT_KEY_MODAL,
  }
}

export function closeImportKeyModal() {
  return {
    type: KEYSTORE_CLOSE_IMPORT_KEY_MODAL,
  }
}

export function setImportKeyData(data) {
  return {
    type: KEYSTORE_SET_IMPORT_KEY_DATA,
    data,
  }
}

export function setImportKeyPassword(password) {
  return {
    type: KEYSTORE_SET_IMPORT_KEY_PASSWORD,
    password,
  }
}

export function setImportKeyPasswordConfirm(passwordConfirm) {
  return {
    type: KEYSTORE_SET_IMPORT_KEY_PASSWORD_CONFIRM,
    passwordConfirm,
  }
}

export function openBackupKeystoreModal() {
  return {
    type: KEYSTORE_OPEN_BACKUP_MODAL,
  }
}

export function closeBackupKeystoreModal() {
  return {
    type: KEYSTORE_CLOSE_BACKUP_MODAL,
  }
}

export function setBackupKeystorePassword(password) {
  return {
    type: KEYSTORE_SET_BACKUP_PASSWORD,
    password,
  }
}

export function backupKeystore(password) {
  return {
    type: KEYSTORE_BACKUP,
  }
}

const ACTION_HANDLERS = {
  [KEYSTORE_GET_FROM_STORAGE]: state => ({
    ...state,
    accounts: [],
    currentAccount: {},
    addressesFromMnemonic: [],
    isLoading: true,
  }),
  [KEYSTORE_SET_ACCOUNTS]: (state, action) => ({
    ...state,
    accounts: action.accounts,
  }),
  [KEYSTORE_SET_CURRENT_ACCOUNT_DATA]: (state, action) => ({
    ...state,
    currentAccount: action.currentAccount,
    isLoading: false,
  }),
  [KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC]: (state, action) => ({
    ...state,
    addressesFromMnemonic: action.addressesFromMnemonic,
  }),
  /**
   * Modals
   */
  [KEYSTORE_OPEN_MODAL]: state => ({
    ...state,
    isKeystoreModalOpen: true,
  }),
  [KEYSTORE_CLOSE_MODAL]: state => ({
    ...state,
    isKeystoreModalOpen: false,
  }),
  [KEYSTORE_OPEN_NEW_KEY_MODAL]: state => ({
    ...state,
    isNewKeyModalOpen: true,
  }),
  [KEYSTORE_CLOSE_NEW_KEY_MODAL]: state => ({
    ...state,
    isNewKeyModalOpen: false,
  }),
  [KEYSTORE_SET_NEW_KEY_MNEMONIC]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      mnemonic: action.mnemonic,
    },
  }),
  [KEYSTORE_SET_NEW_KEY_MNEMONIC_CONFIRM]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      mnemonicConfirm: action.mnemonicConfirm,
    },
  }),
  [KEYSTORE_SET_NEW_KEY_PASSWORD]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      password: action.password,
    },
  }),
  [KEYSTORE_SET_NEW_KEY_PASSWORD_CONFIRM]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      passwordConfirm: action.passwordConfirm,
    },
  }),
  [KEYSTORE_OPEN_IMPORT_KEY_MODAL]: state => ({
    ...state,
    isImportKeyModalOpen: true,
  }),
  [KEYSTORE_CLOSE_IMPORT_KEY_MODAL]: state => ({
    ...state,
    isImportKeyModalOpen: false,
  }),
  [KEYSTORE_SET_IMPORT_KEY_DATA]: (state, action) => ({
    ...state,
    importKeyData: {
      ...state.importKeyData,
      data: action.data,
    },
  }),
  [KEYSTORE_SET_IMPORT_KEY_PASSWORD]: (state, action) => ({
    ...state,
    importKeyData: {
      ...state.importKeyData,
      password: action.password,
    },
  }),
  [KEYSTORE_SET_IMPORT_KEY_PASSWORD_CONFIRM]: (state, action) => ({
    ...state,
    importKeyData: {
      ...state.importKeyData,
      passwordConfirm: action.passwordConfirm,
    },
  }),
  [KEYSTORE_OPEN_BACKUP_MODAL]: state => ({
    ...state,
    isBackupKeystoreModalOpen: true,
  }),
  [KEYSTORE_CLOSE_BACKUP_MODAL]: state => ({
    ...state,
    isBackupKeystoreModalOpen: false,
  }),
  [KEYSTORE_SET_BACKUP_PASSWORD]: (state, action) => ({
    ...state,
    backupData: {
      ...state.backupData,
      password: action.password,
    },
  }),
}

const initialState = {
  newKeyData: {
    disabledFields: [],
    validFields: [],
    invalidFields: [],
    alert: '',
    mnemonic: '',
    mnemonicConfirm: '',
    password: '',
    passwordConfirm: '',
    currentStep: 0,
  },
  importKeyData: {
    disabledFields: [],
    validFields: [],
    invalidFields: [],
    alert: '',
    data: '',
    password: '',
    passwordConfirm: '',
    currentStep: 0,
  },
  backupData: {
    disabledFields: [],
    validFields: [],
    invalidFields: [],
    alert: '',
    password: '',
  },
  currentAccount: {},
  accounts: [],
  addressesFromMnemonic: [],
  isLoading: true,
  isKeystoreModalOpen: false,
  isNewKeyModalOpen: false,
  isImportKeyModalOpen: false,
  isBackupKeystoreModalOpen: false,
}

export default function keystore(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
