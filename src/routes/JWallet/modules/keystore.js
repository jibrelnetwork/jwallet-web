import pushField from 'utils/pushField'

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
export const KEYSTORE_SAVE_MNEMONIC_TO_FILE = 'KEYSTORE_SAVE_MNEMONIC_TO_FILE'
export const KEYSTORE_SORT_ACCOUNTS = 'KEYSTORE_SORT_ACCOUNTS'
export const KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS = 'KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS'

export const KEYSTORE_OPEN_MODAL = 'KEYSTORE_OPEN_MODAL'
export const KEYSTORE_CLOSE_MODAL = 'KEYSTORE_CLOSE_MODAL'

export const KEYSTORE_NEW_KEY_OPEN_MODAL = 'KEYSTORE_NEW_KEY_OPEN_MODAL'
export const KEYSTORE_NEW_KEY_CLOSE_MODAL = 'KEYSTORE_NEW_KEY_CLOSE_MODAL'
export const KEYSTORE_NEW_KEY_SET_MNEMONIC = 'KEYSTORE_NEW_KEY_SET_MNEMONIC'
export const KEYSTORE_NEW_KEY_SET_MNEMONIC_CONFIRM = 'KEYSTORE_NEW_KEY_SET_MNEMONIC_CONFIRM'
export const KEYSTORE_NEW_KEY_SET_PASSWORD = 'KEYSTORE_NEW_KEY_SET_PASSWORD'
export const KEYSTORE_NEW_KEY_SET_PASSWORD_CONFIRM = 'KEYSTORE_NEW_KEY_SET_PASSWORD_CONFIRM'
export const KEYSTORE_NEW_KEY_SET_CURRENT_STEP = 'KEYSTORE_NEW_KEY_SET_CURRENT_STEP'
export const KEYSTORE_NEW_KEY_SET_ALERT = 'KEYSTORE_NEW_KEY_SET_ALERT'
export const KEYSTORE_NEW_KEY_SET_VALID_FIELD = 'KEYSTORE_NEW_KEY_SET_VALID_FIELD'
export const KEYSTORE_NEW_KEY_SET_INVALID_FIELD = 'KEYSTORE_NEW_KEY_SET_INVALID_FIELD'

export const KEYSTORE_IMPORT_KEY_OPEN_MODAL = 'KEYSTORE_IMPORT_KEY_OPEN_MODAL'
export const KEYSTORE_IMPORT_KEY_CLOSE_MODAL = 'KEYSTORE_IMPORT_KEY_CLOSE_MODAL'
export const KEYSTORE_IMPORT_KEY_SET_DATA = 'KEYSTORE_IMPORT_KEY_SET_DATA'
export const KEYSTORE_IMPORT_KEY_SET_PASSWORD = 'KEYSTORE_IMPORT_KEY_SET_PASSWORD'
export const KEYSTORE_IMPORT_KEY_SET_PASSWORD_CONFIRM = 'KEYSTORE_IMPORT_KEY_SET_PASSWORD_CONFIRM'
export const KEYSTORE_IMPORT_KEY_SET_CURRENT_STEP = 'KEYSTORE_IMPORT_KEY_SET_CURRENT_STEP'
export const KEYSTORE_IMPORT_KEY_SET_ALERT = 'KEYSTORE_IMPORT_KEY_SET_ALERT'

export const KEYSTORE_BACKUP_OPEN_MODAL = 'KEYSTORE_BACKUP_OPEN_MODAL'
export const KEYSTORE_BACKUP_CLOSE_MODAL = 'KEYSTORE_BACKUP_CLOSE_MODAL'
export const KEYSTORE_BACKUP_SET_PASSWORD = 'KEYSTORE_BACKUP_SET_PASSWORD'
export const KEYSTORE_BACKUP = 'KEYSTORE_BACKUP'

export function getKeystoreFromStorage() {
  return {
    type: KEYSTORE_GET_FROM_STORAGE,
  }
}

export function createKeystoreAccount(props, onSuccess, onError) {
  return {
    type: KEYSTORE_CREATE_ACCOUNT,
    props,
    onSuccess,
    onError,
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

export function saveMnemonicToFile(mnemonic, onSuccess, onError) {
  return {
    type: KEYSTORE_SAVE_MNEMONIC_TO_FILE,
    mnemonic,
    onSuccess,
    onError,
  }
}

export function sortAccounts(sortField = 'name') {
  return {
    type: KEYSTORE_SORT_ACCOUNTS,
    sortField,
  }
}

export function setSortAccountsOptions(sortField = 'name', sortDirection = 'ASC') {
  return {
    type: KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS,
    sortField,
    sortDirection,
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

export function openNewKeyModal(showKeystoreModalAfterClose = false) {
  return {
    type: KEYSTORE_NEW_KEY_OPEN_MODAL,
    showKeystoreModalAfterClose,
  }
}

export function closeNewKeyModal() {
  return {
    type: KEYSTORE_NEW_KEY_CLOSE_MODAL,
  }
}

export function setNewKeyMnemonic(mnemonic) {
  return {
    type: KEYSTORE_NEW_KEY_SET_MNEMONIC,
    mnemonic,
  }
}

export function setNewKeyMnemonicConfirm(mnemonicConfirm) {
  return {
    type: KEYSTORE_NEW_KEY_SET_MNEMONIC_CONFIRM,
    mnemonicConfirm,
  }
}

export function setNewKeyPassword(password) {
  return {
    type: KEYSTORE_NEW_KEY_SET_PASSWORD,
    password,
  }
}

export function setNewKeyPasswordConfirm(passwordConfirm) {
  return {
    type: KEYSTORE_NEW_KEY_SET_PASSWORD_CONFIRM,
    passwordConfirm,
  }
}

export function setNewKeyCurrentStep(currentStep) {
  return {
    type: KEYSTORE_NEW_KEY_SET_CURRENT_STEP,
    currentStep,
  }
}

export function setNewKeyValidField(name, message) {
  return {
    type: KEYSTORE_NEW_KEY_SET_VALID_FIELD,
    name,
    message,
  }
}

export function setNewKeyInvalidField(name, message) {
  return {
    type: KEYSTORE_NEW_KEY_SET_INVALID_FIELD,
    name,
    message,
  }
}

export function setNewKeyAlert(alert) {
  return {
    type: KEYSTORE_NEW_KEY_SET_ALERT,
    alert,
  }
}

export function openImportKeyModal(showKeystoreModalAfterClose = false) {
  return {
    type: KEYSTORE_IMPORT_KEY_OPEN_MODAL,
    showKeystoreModalAfterClose,
  }
}

export function closeImportKeyModal() {
  return {
    type: KEYSTORE_IMPORT_KEY_CLOSE_MODAL,
  }
}

export function setImportKeyData(data) {
  return {
    type: KEYSTORE_IMPORT_KEY_SET_DATA,
    data,
  }
}

export function setImportKeyPassword(password) {
  return {
    type: KEYSTORE_IMPORT_KEY_SET_PASSWORD,
    password,
  }
}

export function setImportKeyPasswordConfirm(passwordConfirm) {
  return {
    type: KEYSTORE_IMPORT_KEY_SET_PASSWORD_CONFIRM,
    passwordConfirm,
  }
}

export function setImportKeyCurrentStep(currentStep) {
  return {
    type: KEYSTORE_IMPORT_KEY_SET_CURRENT_STEP,
    currentStep,
  }
}

export function setImportKeyAlert(alert) {
  return {
    type: KEYSTORE_IMPORT_KEY_SET_ALERT,
    alert,
  }
}

export function openBackupKeystoreModal() {
  return {
    type: KEYSTORE_BACKUP_OPEN_MODAL,
  }
}

export function closeBackupKeystoreModal() {
  return {
    type: KEYSTORE_BACKUP_CLOSE_MODAL,
  }
}

export function setBackupKeystorePassword(password) {
  return {
    type: KEYSTORE_BACKUP_SET_PASSWORD,
    password,
  }
}

export function backupKeystore(password) {
  return {
    type: KEYSTORE_BACKUP,
    password,
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
  [KEYSTORE_CREATE_ACCOUNT]: state => ({
    ...state,
    isCreating: true,
  }),
  [KEYSTORE_SET_ACCOUNTS]: (state, action) => ({
    ...state,
    accounts: action.accounts,
  }),
  [KEYSTORE_SET_CURRENT_ACCOUNT_DATA]: (state, action) => ({
    ...state,
    currentAccount: action.currentAccount,
    isLoading: false,
    isCreating: false,
    newKeyData: initialState.newKeyData,
    importKeyData: initialState.importKeyData,
  }),
  [KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC]: (state, action) => ({
    ...state,
    addressesFromMnemonic: action.addressesFromMnemonic,
  }),
  [KEYSTORE_SET_SORT_ACCOUNTS_OPTIONS]: (state, action) => ({
    ...state,
    sortField: action.sortField,
    sortDirection: action.sortDirection,
  }),
  /**
   * Modals
   */
  [KEYSTORE_OPEN_MODAL]: state => ({
    ...state,
    isKeystoreModalOpen: true,
    showKeystoreModalAfterClose: false,
  }),
  [KEYSTORE_CLOSE_MODAL]: state => ({
    ...state,
    isKeystoreModalOpen: false,
  }),
  [KEYSTORE_NEW_KEY_OPEN_MODAL]: (state, action) => ({
    ...state,
    isNewKeyModalOpen: true,
    showKeystoreModalAfterClose: action.showKeystoreModalAfterClose,
  }),
  [KEYSTORE_NEW_KEY_CLOSE_MODAL]: state => ({
    ...state,
    isNewKeyModalOpen: false,
  }),
  [KEYSTORE_NEW_KEY_SET_MNEMONIC]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      mnemonic: action.mnemonic,
    },
  }),
  [KEYSTORE_NEW_KEY_SET_MNEMONIC_CONFIRM]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      mnemonicConfirm: action.mnemonicConfirm,
      validFields: pushField(state.newKeyData.validFields, 'mnemonicConfirm'),
      invalidFields: pushField(state.newKeyData.invalidFields, 'mnemonicConfirm'),
    },
  }),
  [KEYSTORE_NEW_KEY_SET_PASSWORD]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      password: action.password,
      validFields: pushField(state.newKeyData.validFields, 'password'),
      invalidFields: pushField(state.newKeyData.invalidFields, 'password'),
    },
  }),
  [KEYSTORE_NEW_KEY_SET_PASSWORD_CONFIRM]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      passwordConfirm: action.passwordConfirm,
      validFields: pushField(state.newKeyData.validFields, 'passwordConfirm'),
      invalidFields: pushField(state.newKeyData.invalidFields, 'passwordConfirm'),
    },
  }),
  [KEYSTORE_NEW_KEY_SET_CURRENT_STEP]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      currentStep: action.currentStep,
    },
  }),
  [KEYSTORE_NEW_KEY_SET_ALERT]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      alert: action.alert,
    },
  }),
  [KEYSTORE_NEW_KEY_SET_VALID_FIELD]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      validFields: pushField(state.newKeyData.validFields, action.name, action.message),
    },
  }),
  [KEYSTORE_NEW_KEY_SET_INVALID_FIELD]: (state, action) => ({
    ...state,
    newKeyData: {
      ...state.newKeyData,
      invalidFields: pushField(state.newKeyData.invalidFields, action.name, action.message),
    },
  }),
  [KEYSTORE_IMPORT_KEY_OPEN_MODAL]: (state, action) => ({
    ...state,
    isImportKeyModalOpen: true,
    showKeystoreModalAfterClose: action.showKeystoreModalAfterClose,
  }),
  [KEYSTORE_IMPORT_KEY_CLOSE_MODAL]: state => ({
    ...state,
    isImportKeyModalOpen: false,
  }),
  [KEYSTORE_IMPORT_KEY_SET_DATA]: (state, action) => ({
    ...state,
    importKeyData: {
      ...state.importKeyData,
      data: action.data,
    },
  }),
  [KEYSTORE_IMPORT_KEY_SET_PASSWORD]: (state, action) => ({
    ...state,
    importKeyData: {
      ...state.importKeyData,
      password: action.password,
    },
  }),
  [KEYSTORE_IMPORT_KEY_SET_PASSWORD_CONFIRM]: (state, action) => ({
    ...state,
    importKeyData: {
      ...state.importKeyData,
      passwordConfirm: action.passwordConfirm,
    },
  }),
  [KEYSTORE_IMPORT_KEY_SET_CURRENT_STEP]: (state, action) => ({
    ...state,
    importKeyData: {
      ...state.importKeyData,
      currentStep: action.currentStep,
    },
  }),
  [KEYSTORE_IMPORT_KEY_SET_ALERT]: (state, action) => ({
    ...state,
    importKeyData: {
      ...state.importKeyData,
      alert: action.alert,
    },
  }),
  [KEYSTORE_BACKUP_OPEN_MODAL]: state => ({
    ...state,
    isBackupKeystoreModalOpen: true,
  }),
  [KEYSTORE_BACKUP_CLOSE_MODAL]: state => ({
    ...state,
    isBackupKeystoreModalOpen: false,
  }),
  [KEYSTORE_BACKUP_SET_PASSWORD]: (state, action) => ({
    ...state,
    backupData: {
      ...state.backupData,
      password: action.password,
    },
  }),
}

const initialState = {
  newKeyData: {
    validFields: [],
    invalidFields: [],
    alert: 'Anyone who has access to your passphrase can spend your money.',
    mnemonic: '',
    mnemonicConfirm: '',
    password: '',
    passwordConfirm: '',
    currentStep: 1,
    totalSteps: 6,
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
    derivationPath: '',
    bip32XPublicKey: '',
    isReadOnly: false,
  },
  accounts: [],
  addressesFromMnemonic: [],
  sortField: '',
  sortDirection: 'ASC',
  isLoading: true,
  isCreating: false,
  isKeystoreModalOpen: false,
  isNewKeyModalOpen: false,
  isImportKeyModalOpen: false,
  isBackupKeystoreModalOpen: false,
  showKeystoreModalAfterClose: false,
}

export default function keystore(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
