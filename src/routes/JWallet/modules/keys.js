export const GET_KEYS_FROM_CACHE = 'GET_KEYS_FROM_CACHE'
export const SET_KEYS_FROM_CACHE = 'SET_KEYS_FROM_CACHE'
export const SET_ACTIVE_KEY = 'SET_ACTIVE_KEY'
export const ADD_NEW_KEYS = 'ADD_NEW_KEYS'
export const IMPORT_KEYS = 'IMPORT_KEYS'
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
    items: [],
    currentActiveIndex: 0,
    isLoading: true,
  }),
  [SET_KEYS_FROM_CACHE]: (state, action) => ({
    ...state,
    isLoading: false,
    items: action.items,
  }),
  [SET_ACTIVE_KEY]: (state, action) => ({
    ...state,
    currentActiveIndex: action.index,
  }),
  [ADD_NEW_KEYS]: (state, items) => ({
    ...state,
    items: [...state.items, ...items],
  }),
  [IMPORT_KEYS]: state => ({
    ...state,
  }),
  [BACKUP_KEYS]: state => ({
    ...state,
  }),
  [CLEAR_KEYS]: state => ({
    ...state,
    items: [],
    currentActiveIndex: 0,
  }),
}

const initialState = {
  items: [],
  currentActiveIndex: 0,
  isLoading: true,
}

export default function keys(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
