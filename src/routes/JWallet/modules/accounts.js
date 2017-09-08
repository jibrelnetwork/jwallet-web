export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export const SET_ACCOUNTS = 'SET_ACCOUNTS'
export const OPEN_ACCOUNT_MANAGER = 'OPEN_ACCOUNT_MANAGER'
export const CLOSE_ACCOUNT_MANAGER = 'CLOSE_ACCOUNT_MANAGER'
export const SET_CURRENT_ACCOUNT = 'SET_CURRENT_ACCOUNT'
export const SET_ACTIVE_ALL = 'SET_ACTIVE_ALL'
export const TOGGLE_ACCOUNT = 'TOGGLE_ACCOUNT'
export const ADD_CUSTOM_TOKEN = 'ADD_CUSTOM_TOKEN'

export function getAccounts() {
  return {
    type: GET_ACCOUNTS,
  }
}

export function setAccounts(items) {
  return {
    type: SET_ACCOUNTS,
    items,
  }
}

export function openAccountManager() {
  return {
    type: OPEN_ACCOUNT_MANAGER,
  }
}

export function closeAccountManager() {
  return {
    type: CLOSE_ACCOUNT_MANAGER,
  }
}

export function setCurrentAccount(index) {
  return {
    type: SET_CURRENT_ACCOUNT,
    index,
  }
}

export function toggleAccount(index) {
  return {
    type: TOGGLE_ACCOUNT,
    index,
  }
}

export function addCustomToken() {
  return {
    type: ADD_CUSTOM_TOKEN,
  }
}

const ACTION_HANDLERS = {
  [GET_ACCOUNTS]: state => ({
    ...state,
    items: [],
    currentActiveIndex: 0,
    isLoading: true,
    isAccountManagerOpen: false,
    isActiveAll: false,
  }),
  [SET_ACCOUNTS]: (state, action) => ({
    ...state,
    items: action.items,
    isLoading: false,
  }),
  [OPEN_ACCOUNT_MANAGER]: state => ({
    ...state,
    isAccountManagerOpen: true,
  }),
  [CLOSE_ACCOUNT_MANAGER]: state => ({
    ...state,
    isAccountManagerOpen: false,
  }),
  [SET_CURRENT_ACCOUNT]: (state, action) => ({
    ...state,
    currentActiveIndex: action.index,
  }),
  [SET_ACTIVE_ALL]: (state, action) => ({
    ...state,
    isActiveAll: action.isActiveAll,
  }),
  [ADD_CUSTOM_TOKEN]: state => ({
    ...state,
  }),
}

const initialState = {
  isLoading: true,
  isAccountManagerOpen: false,
  isActiveAll: false,
  currentActiveIndex: 0,
  items: [],
}

export default function accounts(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
