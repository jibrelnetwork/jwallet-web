export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export const SET_TRANSACTIONS = 'SET_TRANSACTIONS'
export const SEARCH_TRANSACTIONS = 'SEARCH_TRANSACTIONS'
export const SORT_TRANSACTIONS = 'SORT_TRANSACTIONS'
export const SET_SEARCH_TRANSACTIONS_OPTIONS = 'SET_SEARCH_TRANSACTIONS_OPTIONS'
export const SET_SORT_TRANSACTIONS_OPTIONS = 'SET_SORT_TRANSACTIONS_OPTIONS'

export function getTransactions() {
  return {
    type: GET_TRANSACTIONS,
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
}

const initialState = {
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
