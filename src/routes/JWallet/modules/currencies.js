export const CURRENCIES_GET = 'CURRENCIES_GET'
export const CURRENCIES_SET = 'CURRENCIES_SET'
export const CURRENCIES_GET_BALANCES = 'CURRENCIES_GET_BALANCES'
export const CURRENCIES_SET_BALANCES = 'CURRENCIES_SET_BALANCES'
export const CURRENCIES_SET_CURRENT = 'CURRENCIES_SET_CURRENT'
export const CURRENCIES_TOGGLE_ACTIVE = 'CURRENCIES_TOGGLE_ACTIVE'

export const CURRENCIES_OPEN_MODAL = 'CURRENCIES_OPEN_MODAL'
export const CURRENCIES_CLOSE_MODAL = 'CURRENCIES_CLOSE_MODAL'
export const CURRENCIES_SEARCH = 'CURRENCIES_SEARCH'
export const CURRENCIES_SORT = 'CURRENCIES_SORT'
export const CURRENCIES_SET_SEARCH_OPTIONS = 'CURRENCIES_SET_SEARCH_OPTIONS'
export const CURRENCIES_SET_SORT_OPTIONS = 'CURRENCIES_SET_SORT_OPTIONS'
export const CURRENCIES_SET_ACTIVE_ALL = 'CURRENCIES_SET_ACTIVE_ALL'

export const CURRENCIES_ADD_CUSTOM = 'CURRENCIES_ADD_CUSTOM'

export function getCurrencies() {
  return {
    type: CURRENCIES_GET,
  }
}

export function setCurrencies(items) {
  return {
    type: CURRENCIES_SET,
    items,
  }
}

export function setCurrentCurrency(currentActiveIndex) {
  return {
    type: CURRENCIES_SET_CURRENT,
    currentActiveIndex,
  }
}

export function toggleActiveCurrency(index) {
  return {
    type: CURRENCIES_TOGGLE_ACTIVE,
    index,
  }
}

export function openCurrenciesModal(onClose) {
  return {
    type: CURRENCIES_OPEN_MODAL,
    onClose,
  }
}

export function closeCurrenciesModal() {
  return {
    type: CURRENCIES_CLOSE_MODAL,
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

export function addCustomToken(customTokenData) {
  return {
    type: CURRENCIES_ADD_CUSTOM,
    customTokenData,
  }
}

const ACTION_HANDLERS = {
  [CURRENCIES_GET]: () => initialState,
  [CURRENCIES_SET]: (state, action) => ({
    ...state,
    items: action.items,
  }),
  [CURRENCIES_SET_CURRENT]: (state, action) => ({
    ...state,
    currentActiveIndex: action.currentActiveIndex,
    isLoading: false,
  }),
  [CURRENCIES_SET_ACTIVE_ALL]: (state, action) => ({
    ...state,
    isActiveAll: action.isActiveAll,
  }),
  [CURRENCIES_OPEN_MODAL]: (state, action) => ({
    ...state,
    isOpen: true,
    onClose: action.onClose,
  }),
  [CURRENCIES_CLOSE_MODAL]: state => ({
    ...state,
    isOpen: false,
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
  [CURRENCIES_SET_BALANCES]: (state, action) => ({
    ...state,
    balances: action.balances,
  }),
}

const initialState = {
  items: [],
  foundItemsSymbols: [],
  balances: {},
  sortField: '',
  sortDirection: 'ASC',
  searchQuery: '',
  currentActiveIndex: 1,
  isLoading: true,
  isActiveAll: false,
  isOpen: false,
  onClose: null,
}

export default function currencies(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
