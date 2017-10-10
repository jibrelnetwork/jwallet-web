export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS'

export const SEARCH_TRANSACTIONS = 'SEARCH_TRANSACTIONS'
export const SET_SEARCH_TRANSACTIONS_OPTIONS = 'SET_SEARCH_TRANSACTIONS_OPTIONS'

export const SORT_TRANSACTIONS = 'SORT_TRANSACTIONS'
export const SET_SORT_TRANSACTIONS_OPTIONS = 'SET_SORT_TRANSACTIONS_OPTIONS'

export const SET_START_FILTER_TIME = 'SET_START_FILTER_TIME'
export const SET_END_FILTER_TIME = 'SET_END_FILTER_TIME'
export const FILTER_TRANSACTIONS = 'FILTER_TRANSACTIONS'

export function getTransactions(currencyIndex) {
  return {
    type: GET_TRANSACTIONS,
    currencyIndex,
  }
}

export function searchTransactions(searchQuery) {
  return {
    type: SEARCH_TRANSACTIONS,
    searchQuery,
  }
}

export function sortTransactions(sortField) {
  return {
    type: SORT_TRANSACTIONS,
    sortField,
  }
}

export function setSearchTransactionsOptions(foundItemsHashes, searchQuery) {
  return {
    type: SET_SEARCH_TRANSACTIONS_OPTIONS,
    foundItemsHashes,
    searchQuery,
  }
}

export function setSortTransactionsOptions(sortField, sortDirection) {
  return {
    type: SET_SORT_TRANSACTIONS_OPTIONS,
    sortField,
    sortDirection,
  }
}

export function setStartFilterTime(startTime) {
  return {
    type: SET_START_FILTER_TIME,
    startTime,
  }
}

export function setEndFilterTime(endTime) {
  return {
    type: SET_END_FILTER_TIME,
    endTime,
  }
}

export function filterTransactions(isOpen) {
  return {
    type: FILTER_TRANSACTIONS,
    isOpen,
  }
}

const ACTION_HANDLERS = {
  [GET_TRANSACTIONS]: state => ({
    ...state,
    items: [],
    searchQuery: '',
    isLoading: true,
  }),
  [SET_TRANSACTIONS]: (state, action) => ({
    ...state,
    items: action.items,
    isLoading: false,
  }),
  [SET_SEARCH_TRANSACTIONS_OPTIONS]: (state, action) => ({
    ...state,
    foundItemsHashes: action.foundItemsHashes,
    searchQuery: action.searchQuery,
  }),
  [SET_SORT_TRANSACTIONS_OPTIONS]: (state, action) => ({
    ...state,
    sortField: action.sortField,
    sortDirection: action.sortDirection,
  }),
  [SET_START_FILTER_TIME]: (state, action) => ({
    ...state,
    filterData: {
      ...state.filterData,
      startTime: action.startTime,
    },
  }),
  [SET_END_FILTER_TIME]: (state, action) => ({
    ...state,
    filterData: {
      ...state.filterData,
      endTime: action.endTime,
    },
  }),
  [FILTER_TRANSACTIONS]: (state, action) => ({
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
  sortField: '',
  sortDirection: 'ASC',
  searchQuery: '',
  isLoading: true,
}

export default function transactions(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
