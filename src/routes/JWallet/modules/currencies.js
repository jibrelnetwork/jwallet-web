export const CURRENCIES_GET_FROM_STORAGE = 'GET_ACCOUNTS_FROM_STORAGE'
export const CURRENCIES_SET = 'CURRENCIES_SET'

export const CURRENCIES_OPEN_MODAL = 'CURRENCIES_OPEN_MODAL'
export const CURRENCIES_CLOSE_MODAL = 'CURRENCIES_CLOSE_MODAL'
export const CURRENCIES_SET_CURRENT = 'CURRENCIES_SET_CURRENT'
export const CURRENCIES_SET_ACTIVE_ALL = 'CURRENCIES_SET_ACTIVE_ALL'
export const CURRENCIES_TOGGLE_ACTIVE = 'CURRENCIES_TOGGLE_ACTIVE'
export const CURRENCIES_SEARCH = 'CURRENCIES_SEARCH'
export const CURRENCIES_SORT = 'CURRENCIES_SORT'
export const CURRENCIES_SET_SEARCH_OPTIONS = 'CURRENCIES_SET_SEARCH_OPTIONS'
export const CURRENCIES_SET_SORT_OPTIONS = 'CURRENCIES_SET_SORT_OPTIONS'

export const CURRENCIES_CUSTOM_TOKEN_OPEN_MODAL = 'CURRENCIES_CUSTOM_TOKEN_OPEN_MODAL'
export const CURRENCIES_CUSTOM_TOKEN_CLOSE_MODAL = 'CURRENCIES_CUSTOM_TOKEN_CLOSE_MODAL'
export const CURRENCIES_CUSTOM_TOKEN_SET_ADDRESS = 'CURRENCIES_CUSTOM_TOKEN_SET_ADDRESS'
export const CURRENCIES_CUSTOM_TOKEN_SET_NAME = 'CURRENCIES_CUSTOM_TOKEN_SET_NAME'
export const CURRENCIES_CUSTOM_TOKEN_SET_SYMBOL = 'CURRENCIES_CUSTOM_TOKEN_SET_SYMBOL'
export const CURRENCIES_CUSTOM_TOKEN_SET_DECIMALS = 'CURRENCIES_CUSTOM_TOKEN_SET_DECIMALS'
export const CURRENCIES_CUSTOM_TOKEN_ADD = 'CURRENCIES_CUSTOM_TOKEN_ADD'

export function getCurrencies() {
  return {
    type: CURRENCIES_GET_FROM_STORAGE,
  }
}

export function setCurrencies(items) {
  return {
    type: CURRENCIES_SET,
    items,
  }
}

export function openCurrenciesModal() {
  return {
    type: CURRENCIES_OPEN_MODAL,
  }
}

export function closeCurrenciesModal() {
  return {
    type: CURRENCIES_CLOSE_MODAL,
  }
}

export function setCurrentCurrency(index) {
  return {
    type: CURRENCIES_SET_CURRENT,
    index,
  }
}

export function toggleActiveCurrency(index) {
  return {
    type: CURRENCIES_TOGGLE_ACTIVE,
    index,
  }
}

export function searchCurrencies(searchQuery) {
  return {
    type: CURRENCIES_SEARCH,
    searchQuery,
  }
}

export function sortCurrencies(sortField) {
  return {
    type: CURRENCIES_SORT,
    sortField,
  }
}

export function setSearchCurrenciesOptions(foundItemsSymbols, searchQuery) {
  return {
    type: CURRENCIES_SET_SEARCH_OPTIONS,
    foundItemsSymbols,
    searchQuery,
  }
}

export function setSortCurrenciesOptions(sortField, sortDirection) {
  return {
    type: CURRENCIES_SET_SORT_OPTIONS,
    sortField,
    sortDirection,
  }
}

/**
 * Custom Token Modal
 */
export function openCustomTokenModal() {
  return {
    type: CURRENCIES_CUSTOM_TOKEN_OPEN_MODAL,
  }
}

export function closeCustomTokenModal() {
  return {
    type: CURRENCIES_CUSTOM_TOKEN_CLOSE_MODAL,
  }
}

export function setCustomTokenAddress(address) {
  return {
    type: CURRENCIES_CUSTOM_TOKEN_SET_ADDRESS,
    address,
  }
}

export function setCustomTokenName(name) {
  return {
    type: CURRENCIES_CUSTOM_TOKEN_SET_NAME,
    name,
  }
}

export function setCustomTokenSymbol(symbol) {
  return {
    type: CURRENCIES_CUSTOM_TOKEN_SET_SYMBOL,
    symbol,
  }
}

export function setCustomTokenDecimals(decimals) {
  return {
    type: CURRENCIES_CUSTOM_TOKEN_SET_DECIMALS,
    decimals,
  }
}

export function addCustomToken() {
  return {
    type: CURRENCIES_CUSTOM_TOKEN_ADD,
  }
}

const ACTION_HANDLERS = {
  [CURRENCIES_GET_FROM_STORAGE]: () => initialState,
  [CURRENCIES_SET]: (state, action) => ({
    ...state,
    items: action.items || state.items,
    isLoading: false,
  }),
  [CURRENCIES_OPEN_MODAL]: state => ({
    ...state,
    isCurrenciesModalOpen: true,
  }),
  [CURRENCIES_CLOSE_MODAL]: state => ({
    ...state,
    isCurrenciesModalOpen: false,
  }),
  [CURRENCIES_SET_CURRENT]: (state, action) => ({
    ...state,
    currentActiveIndex: action.index,
  }),
  [CURRENCIES_SET_ACTIVE_ALL]: (state, action) => ({
    ...state,
    isActiveAll: action.isActiveAll,
  }),
  [CURRENCIES_SET_SEARCH_OPTIONS]: (state, action) => ({
    ...state,
    foundItemsSymbols: action.foundItemsSymbols,
    searchQuery: action.searchQuery,
  }),
  [CURRENCIES_SET_SORT_OPTIONS]: (state, action) => ({
    ...state,
    sortField: action.sortField,
    sortDirection: action.sortDirection,
  }),
  [CURRENCIES_CUSTOM_TOKEN_OPEN_MODAL]: state => ({
    ...state,
    isCustomTokenModalOpen: true,
  }),
  [CURRENCIES_CUSTOM_TOKEN_CLOSE_MODAL]: state => ({
    ...state,
    isCustomTokenModalOpen: false,
  }),
  [CURRENCIES_CUSTOM_TOKEN_SET_ADDRESS]: (state, action) => ({
    ...state,
    customTokenData: {
      ...state.customTokenData,
      address: action.address,
    },
  }),
  [CURRENCIES_CUSTOM_TOKEN_SET_NAME]: (state, action) => ({
    ...state,
    customTokenData: {
      ...state.customTokenData,
      name: action.name,
    },
  }),
  [CURRENCIES_CUSTOM_TOKEN_SET_SYMBOL]: (state, action) => ({
    ...state,
    customTokenData: {
      ...state.customTokenData,
      symbol: action.symbol,
    },
  }),
  [CURRENCIES_CUSTOM_TOKEN_SET_DECIMALS]: (state, action) => ({
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
  currentActiveIndex: 1,
  isLoading: true,
  isActiveAll: false,
  isCurrenciesModalOpen: false,
  isCustomTokenModalOpen: false,
}

export default function accounts(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
