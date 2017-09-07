const GET_KEYS_FROM_CACHE = 'GET_KEYS_FROM_CACHE'
const SET_ACTIVE_KEY = 'SET_ACTIVE_KEY'
const ADD_NEW_KEYS = 'ADD_NEW_KEYS'
const IMPORT_KEYS = 'IMPORT_KEYS'
const BACKUP_KEYS = 'BACKUP_KEYS'
const CLEAR_KEYS = 'CLEAR_KEYS'

export function getKeysFromCache() {
  return {
    type: GET_KEYS_FROM_CACHE,
  }
}

export function setActiveKey() {
  return {
    type: SET_ACTIVE_KEY,
  }
}

export function addNewKeys() {
  return {
    type: ADD_NEW_KEYS,
  }
}

export function importKeys() {
  return {
    type: IMPORT_KEYS,
  }
}

export function backupKeys() {
  return {
    type: BACKUP_KEYS,
  }
}

export function clearKeys() {
  return {
    type: CLEAR_KEYS,
  }
}

const ACTION_HANDLERS = {
  [GET_KEYS_FROM_CACHE]: state => ({
    ...state,
  }),
  [SET_ACTIVE_KEY]: state => ({
    ...state,
  }),
  [ADD_NEW_KEYS]: state => ({
    ...state,
  }),
  [IMPORT_KEYS]: state => ({
    ...state,
  }),
  [BACKUP_KEYS]: state => ({
    ...state,
  }),
  [CLEAR_KEYS]: state => ({
    ...state,
  }),
}

const initialState = {
  items: [
    { privateKey: '0x12E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
    { privateKey: '0x22E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
    { privateKey: '0x32E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
    { privateKey: '0x42E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
    { privateKey: '0x52E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
    { privateKey: '0x62E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: '12.990', code: 'ETH' },
  ],
  active: 1,
}

export default function keys(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
