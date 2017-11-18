export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export const SET_ACCOUNTS = 'SET_ACCOUNTS'

export const OPEN_ACCOUNT_MANAGER = 'OPEN_ACCOUNT_MANAGER'
export const CLOSE_ACCOUNT_MANAGER = 'CLOSE_ACCOUNT_MANAGER'
export const SET_CURRENT_ACCOUNT = 'SET_CURRENT_ACCOUNT'
export const SET_ACTIVE_ALL = 'SET_ACTIVE_ALL'
export const TOGGLE_ACCOUNT = 'TOGGLE_ACCOUNT'
export const SEARCH_ACCOUNTS = 'SEARCH_ACCOUNTS'
export const SORT_ACCOUNTS = 'SORT_ACCOUNTS'
export const SET_SEARCH_ACCOUNTS_OPTIONS = 'SET_SEARCH_ACCOUNTS_OPTIONS'
export const SET_SORT_ACCOUNTS_OPTIONS = 'SET_SORT_ACCOUNTS_OPTIONS'

export const OPEN_ADD_CUSTOM_TOKEN_MODAL = 'OPEN_ADD_CUSTOM_TOKEN_MODAL'
export const CLOSE_ADD_CUSTOM_TOKEN_MODAL = 'CLOSE_ADD_CUSTOM_TOKEN_MODAL'
export const SET_CUSTOM_TOKEN_ADDRESS = 'SET_CUSTOM_TOKEN_ADDRESS'
export const SET_CUSTOM_TOKEN_NAME = 'SET_CUSTOM_TOKEN_NAME'
export const SET_CUSTOM_TOKEN_SYMBOL = 'SET_CUSTOM_TOKEN_SYMBOL'
export const SET_CUSTOM_TOKEN_DECIMALS = 'SET_CUSTOM_TOKEN_DECIMALS'
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

export function searchAccounts(searchQuery) {
  return {
    type: SEARCH_ACCOUNTS,
    searchQuery,
  }
}

export function sortAccounts(sortField) {
  return {
    type: SORT_ACCOUNTS,
    sortField,
  }
}

export function setSearchAccountsOptions(foundItemsSymbols, searchQuery) {
  return {
    type: SET_SEARCH_ACCOUNTS_OPTIONS,
    foundItemsSymbols,
    searchQuery,
  }
}

export function setSortAccountsOptions(sortField, sortDirection) {
  return {
    type: SET_SORT_ACCOUNTS_OPTIONS,
    sortField,
    sortDirection,
  }
}

export function openAddCustomTokenModal() {
  return {
    type: OPEN_ADD_CUSTOM_TOKEN_MODAL,
  }
}

export function closeAddCustomTokenModal() {
  return {
    type: CLOSE_ADD_CUSTOM_TOKEN_MODAL,
  }
}

export function setCustomTokenAddress(address) {
  return {
    type: SET_CUSTOM_TOKEN_ADDRESS,
    address,
  }
}

export function setCustomTokenName(name) {
  return {
    type: SET_CUSTOM_TOKEN_NAME,
    name,
  }
}

export function setCustomTokenSymbol(symbol) {
  return {
    type: SET_CUSTOM_TOKEN_SYMBOL,
    symbol,
  }
}

export function setCustomTokenDecimals(decimals) {
  return {
    type: SET_CUSTOM_TOKEN_DECIMALS,
    decimals,
  }
}

export function addCustomToken() {
  return {
    type: ADD_CUSTOM_TOKEN,
  }
}

const ACTION_HANDLERS = {
  [GET_ACCOUNTS]: () => initialState,
  [SET_ACCOUNTS]: (state, action) => ({
    ...state,
    items: action.items || state.items,
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
  [SET_SEARCH_ACCOUNTS_OPTIONS]: (state, action) => ({
    ...state,
    foundItemsSymbols: action.foundItemsSymbols,
    searchQuery: action.searchQuery,
  }),
  [SET_SORT_ACCOUNTS_OPTIONS]: (state, action) => ({
    ...state,
    sortField: action.sortField,
    sortDirection: action.sortDirection,
  }),
  [OPEN_ADD_CUSTOM_TOKEN_MODAL]: state => ({
    ...state,
    isAddCustomTokenModalOpen: true,
  }),
  [CLOSE_ADD_CUSTOM_TOKEN_MODAL]: state => ({
    ...state,
    isAddCustomTokenModalOpen: false,
  }),
  [SET_CUSTOM_TOKEN_ADDRESS]: (state, action) => ({
    ...state,
    customTokenData: {
      ...state.customTokenData,
      address: action.address,
    },
  }),
  [SET_CUSTOM_TOKEN_NAME]: (state, action) => ({
    ...state,
    customTokenData: {
      ...state.customTokenData,
      name: action.name,
    },
  }),
  [SET_CUSTOM_TOKEN_SYMBOL]: (state, action) => ({
    ...state,
    customTokenData: {
      ...state.customTokenData,
      symbol: action.symbol,
    },
  }),
  [SET_CUSTOM_TOKEN_DECIMALS]: (state, action) => ({
    ...state,
    customTokenData: {
      ...state.customTokenData,
      decimals: action.decimals,
    },
  }),
}

const initialState = {
  customTokenData: {
    disabledFields: [],
    validFields: [],
    invalidFields: [],
    alert: '',
    address: '',
    name: '',
    symbol: '',
    decimals: '',
  },
  items: [],
  foundItemsSymbols: [],
  sortField: '',
  sortDirection: 'ASC',
  searchQuery: '',
  currentActiveIndex: 0,
  isLoading: true,
  isActiveAll: false,
  isAccountManagerOpen: false,
  isAddCustomTokenModalOpen: false,
}

export default function accounts(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
