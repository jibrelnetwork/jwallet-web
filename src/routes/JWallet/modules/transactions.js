export const TRANSACTIONS_GET = 'TRANSACTIONS_GET'
export const TRANSACTIONS_SET = 'TRANSACTIONS_SET'

export const TRANSACTIONS_SEARCH = 'TRANSACTIONS_SEARCH'
export const TRANSACTIONS_SET_SEARCH_OPTIONS = 'TRANSACTIONS_SET_SEARCH_OPTIONS'

export const TRANSACTIONS_SORT = 'TRANSACTIONS_SORT'
export const TRANSACTIONS_SET_SORT_OPTIONS = 'TRANSACTIONS_SET_SORT_OPTIONS'

export const TRANSACTIONS_SET_START_FILTER_TIME = 'TRANSACTIONS_SET_START_FILTER_TIME'
export const TRANSACTIONS_SET_END_FILTER_TIME = 'TRANSACTIONS_SET_END_FILTER_TIME'
export const TRANSACTIONS_FILTER = 'TRANSACTIONS_FILTER'

export function getTransactions(currencyIndex = 0) {
  return {
    type: TRANSACTIONS_GET,
    currencyIndex,
  }
}

export function searchTransactions(searchQuery = '') {
  return {
    type: TRANSACTIONS_SEARCH,
    searchQuery,
  }
}

export function setSearchTransactionsOptions(foundItemsHashes = [], searchQuery = '') {
  return {
    type: TRANSACTIONS_SET_SEARCH_OPTIONS,
    foundItemsHashes,
    searchQuery,
  }
}

export function sortTransactions(sortField = '') {
  return {
    type: TRANSACTIONS_SORT,
    sortField,
  }
}

export function setSortTransactionsOptions(sortField = '', sortDirection = 'ASC') {
  return {
    type: TRANSACTIONS_SET_SORT_OPTIONS,
    sortField,
    sortDirection,
  }
}

export function setStartFilterTime(startTime = 0) {
  return {
    type: TRANSACTIONS_SET_START_FILTER_TIME,
    startTime,
  }
}

export function setEndFilterTime(endTime = 0) {
  return {
    type: TRANSACTIONS_SET_END_FILTER_TIME,
    endTime,
  }
}

export function filterTransactions(isOpen = false) {
  return {
    type: TRANSACTIONS_FILTER,
    isOpen,
  }
}

const ACTION_HANDLERS = {
  [TRANSACTIONS_GET]: state => ({
    ...state,
    items: initialState.items,
    searchQuery: initialState.searchQuery,
    isLoading: initialState.isLoading,
  }),
  [TRANSACTIONS_SET]: (state, action) => ({
    ...state,
    items: action.items,
    isLoading: false,
  }),
  [TRANSACTIONS_SET_SEARCH_OPTIONS]: (state, action) => ({
    ...state,
    foundItemsHashes: action.foundItemsHashes,
    searchQuery: action.searchQuery,
  }),
  [TRANSACTIONS_SET_SORT_OPTIONS]: (state, action) => ({
    ...state,
    sortField: action.sortField,
    sortDirection: action.sortDirection,
  }),
  [TRANSACTIONS_SET_START_FILTER_TIME]: (state, action) => ({
    ...state,
    filterData: {
      ...state.filterData,
      startTime: action.startTime,
    },
  }),
  [TRANSACTIONS_SET_END_FILTER_TIME]: (state, action) => ({
    ...state,
    filterData: {
      ...state.filterData,
      endTime: action.endTime,
    },
  }),
  [TRANSACTIONS_FILTER]: (state, action) => ({
    ...state,
    filterData: {
      ...state.filterData,
      isOpen: action.isOpen,
    },
  }),
}

const initialState = {
  filterData: {
    startTime: 0,
    endTime: 0,
    isOpen: false,
  },
  items: [],
  foundItemsHashes: [],
  sortField: 'timestamp',
  sortDirection: 'DESC',
  searchQuery: '',
  isLoading: true,
}

export default function transactions(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
