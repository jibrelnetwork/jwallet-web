export const TRANSACTIONS_GET = 'TRANSACTIONS_GET'
export const TRANSACTIONS_SET = 'TRANSACTIONS_SET'

export const TRANSACTIONS_SEARCH = 'TRANSACTIONS_SEARCH'
export const TRANSACTIONS_SET_SEARCH_OPTIONS = 'TRANSACTIONS_SET_SEARCH_OPTIONS'

export const TRANSACTIONS_SORT = 'TRANSACTIONS_SORT'
export const TRANSACTIONS_SET_SORT_OPTIONS = 'TRANSACTIONS_SET_SORT_OPTIONS'

export const TRANSACTIONS_SET_START_FILTER_TIME = 'TRANSACTIONS_SET_START_FILTER_TIME'
export const TRANSACTIONS_SET_END_FILTER_TIME = 'TRANSACTIONS_SET_END_FILTER_TIME'
export const TRANSACTIONS_FILTER = 'TRANSACTIONS_FILTER'

export const TRANSACTIONS_SET_BLOCK_EXPLORER_ERROR = 'TRANSACTIONS_SET_BLOCK_EXPLORER_ERROR'

export function getTransactions() {
  return {
    type: TRANSACTIONS_GET,
  }
}

export function searchTransactions(searchQuery: string) {
  return {
    type: TRANSACTIONS_SEARCH,
    searchQuery,
  }
}

export function setSearchTransactionsOptions(foundItemsHashes: Array<Hash>, searchQuery: string) {
  return {
    type: TRANSACTIONS_SET_SEARCH_OPTIONS,
    foundItemsHashes,
    searchQuery,
  }
}

export function sortTransactions(sortField: string) {
  return {
    type: TRANSACTIONS_SORT,
    sortField,
  }
}

export function setSortTransactionsOptions(sortField: string, sortDirection: string) {
  return {
    type: TRANSACTIONS_SET_SORT_OPTIONS,
    sortField,
    sortDirection,
  }
}

export function setStartFilterTime(startTime: string) {
  return {
    type: TRANSACTIONS_SET_START_FILTER_TIME,
    startTime,
  }
}

export function setEndFilterTime(endTime: string) {
  return {
    type: TRANSACTIONS_SET_END_FILTER_TIME,
    endTime,
  }
}

export function filterTransactions(isOpen: boolean) {
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
    isBlockExplorerError: initialState.isBlockExplorerError,
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
  [TRANSACTIONS_SET_BLOCK_EXPLORER_ERROR]: state => ({
    ...state,
    isBlockExplorerError: true,
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
  isBlockExplorerError: false,
}

export default function transactions(state: any = initialState, action: any) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
