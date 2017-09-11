export const GET_KEYS_FROM_CACHE = 'GET_KEYS_FROM_CACHE'
export const SET_KEYS_FROM_CACHE = 'SET_KEYS_FROM_CACHE'
export const SET_ACTIVE_KEY = 'SET_ACTIVE_KEY'

export const OPEN_NEW_KEYS_MODAL = 'OPEN_NEW_KEYS_MODAL'
export const CLOSE_NEW_KEYS_MODAL = 'CLOSE_NEW_KEYS_MODAL'
export const SET_NEW_KEYS_MNEMONIC = 'SET_NEW_KEYS_MNEMONIC'
export const SAVE_NEW_KEYS_AS_TXT = 'SAVE_NEW_KEYS_AS_TXT'

export const OPEN_IMPORT_KEYS_MODAL = 'OPEN_IMPORT_KEYS_MODAL'
export const CLOSE_IMPORT_KEYS_MODAL = 'CLOSE_IMPORT_KEYS_MODAL'
export const SET_IMPORT_KEYS_DATA = 'SET_IMPORT_KEYS_DATA'
export const SET_IMPORT_KEYS_PINCODE = 'SET_IMPORT_KEYS_PINCODE'
export const IMPORT_KEYS = 'IMPORT_KEYS'

export const OPEN_BACKUP_KEYS_MODAL = 'OPEN_BACKUP_KEYS_MODAL'
export const CLOSE_BACKUP_KEYS_MODAL = 'CLOSE_BACKUP_KEYS_MODAL'
export const SET_BACKUP_KEYS_ADDRESS = 'SET_BACKUP_KEYS_ADDRESS'
export const SET_BACKUP_KEYS_PRIVATE_KEY = 'SET_BACKUP_KEYS_PRIVATE_KEY'
export const SET_BACKUP_KEYS_MNEMONIC = 'SET_BACKUP_KEYS_MNEMONIC'
export const BACKUP_KEYS = 'BACKUP_KEYS'

export const CLEAR_KEYS = 'CLEAR_KEYS'

export function getKeysFromCache() {
  return {
    type: GET_KEYS_FROM_CACHE,
  }
}

export function setActiveKey(index) {
  return {
    type: SET_ACTIVE_KEY,
    index,
  }
}

/**
 * New keys
 */
export function openNewKeysModal() {
  return {
    type: OPEN_NEW_KEYS_MODAL,
  }
}

export function closeNewKeysModal() {
  return {
    type: CLOSE_NEW_KEYS_MODAL,
  }
}

export function setNewKeysMnemonic(mnemonic) {
  return {
    type: SET_NEW_KEYS_MNEMONIC,
    mnemonic,
  }
}

export function saveNewKeysAsTXT() {
  return {
    type: SAVE_NEW_KEYS_AS_TXT,
  }
}

/**
 * Import keys
 */
export function openImportKeysModal() {
  return {
    type: OPEN_IMPORT_KEYS_MODAL,
  }
}

export function closeImportKeysModal() {
  return {
    type: CLOSE_IMPORT_KEYS_MODAL,
  }
}

export function setImportKeysData(data) {
  return {
    type: SET_IMPORT_KEYS_DATA,
    data,
  }
}

export function setImportKeysPincode(pincode) {
  return {
    type: SET_IMPORT_KEYS_PINCODE,
    pincode,
  }
}

export function importKeys() {
  return {
    type: IMPORT_KEYS,
  }
}

/**
 * Backup keys
 */
export function openBackupKeysModal() {
  return {
    type: OPEN_BACKUP_KEYS_MODAL,
  }
}

export function closeBackupKeysModal() {
  return {
    type: CLOSE_BACKUP_KEYS_MODAL,
  }
}

export function setBackupKeysAddress(address) {
  return {
    type: SET_BACKUP_KEYS_ADDRESS,
    address,
  }
}

export function setBackupKeysPrivateKey(privateKey) {
  return {
    type: SET_BACKUP_KEYS_PRIVATE_KEY,
    privateKey,
  }
}

export function setBackupKeysMnemonic(mnemonic) {
  return {
    type: SET_BACKUP_KEYS_MNEMONIC,
    mnemonic,
  }
}

export function backupKeys() {
  return {
    type: BACKUP_KEYS,
  }
}

/**
 * Clear keys
 */
export function clearKeys() {
  return {
    type: CLEAR_KEYS,
  }
}

const ACTION_HANDLERS = {
  [GET_KEYS_FROM_CACHE]: state => ({
    ...state,
    items: [],
    currentActiveIndex: -1,
    isLoading: true,
  }),
  [SET_KEYS_FROM_CACHE]: (state, action) => ({
    ...state,
    items: action.items,
    currentActiveIndex: 0,
    isLoading: false,
  }),
  [SET_ACTIVE_KEY]: (state, action) => ({
    ...state,
    currentActiveIndex: action.index,
  }),
  [OPEN_NEW_KEYS_MODAL]: state => ({
    ...state,
    isNewKeysModalOpen: true,
  }),
  [CLOSE_NEW_KEYS_MODAL]: state => ({
    ...state,
    isNewKeysModalOpen: false,
  }),
  [SET_NEW_KEYS_MNEMONIC]: (state, action) => ({
    ...state,
    newKeysData: {
      ...state.newKeysData,
      mnemonic: action.mnemonic,
    },
  }),
  [OPEN_IMPORT_KEYS_MODAL]: state => ({
    ...state,
    isImportKeysModalOpen: true,
  }),
  [CLOSE_IMPORT_KEYS_MODAL]: state => ({
    ...state,
    isImportKeysModalOpen: false,
  }),
  [SET_IMPORT_KEYS_DATA]: (state, action) => ({
    ...state,
    importKeysData: {
      ...state.importKeysData,
      data: action.data,
    },
  }),
  [SET_IMPORT_KEYS_PINCODE]: (state, action) => ({
    ...state,
    importKeysData: {
      ...state.importKeysData,
      pincode: action.pincode,
    },
  }),
  [OPEN_BACKUP_KEYS_MODAL]: state => ({
    ...state,
    isBackupKeysModalOpen: true,
  }),
  [CLOSE_BACKUP_KEYS_MODAL]: state => ({
    ...state,
    isBackupKeysModalOpen: false,
  }),
  [SET_BACKUP_KEYS_ADDRESS]: (state, action) => ({
    ...state,
    backupKeysData: {
      ...state.backupKeysData,
      address: action.address,
    },
  }),
  [SET_BACKUP_KEYS_PRIVATE_KEY]: (state, action) => ({
    ...state,
    backupKeysData: {
      ...state.backupKeysData,
      privateKey: action.privateKey,
    },
  }),
  [SET_BACKUP_KEYS_MNEMONIC]: (state, action) => ({
    ...state,
    backupKeysData: {
      ...state.backupKeysData,
      mnemonic: action.mnemonic,
    },
  }),
  [CLEAR_KEYS]: state => ({
    ...state,
    items: [],
    currentActiveIndex: -1,
  }),
}

const initialState = {
  newKeysData: {
    disabledFields: [],
    validFields: [],
    invalidFields: [],
    alert: '',
    mnemonic: '',
  },
  importKeysData: {
    disabledFields: [],
    validFields: [],
    invalidFields: [],
    alert: '',
    data: '',
    pincode: '',
  },
  backupKeysData: {
    disabledFields: [],
    validFields: [],
    invalidFields: [],
    alert: '',
    address: '',
    privateKey: '',
    mnemonic: '',
  },
  items: [],
  currentActiveIndex: -1,
  isLoading: true,
  isNewKeysModalOpen: false,
  isImportKeysModalOpen: false,
  isBackupKeysModalOpen: false,
}

export default function keys(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
