// @flow

import { assoc, assocPath, compose } from 'ramda'

export const OPEN = '@@transactions/OPEN'
export const CLOSE = '@@transactions/CLOSE'
export const RESET = '@@transactions/RESET'
export const SET_LOADING = '@@transactions/SET_LOADING'
export const GET = '@@transactions/GET'
export const GET_CANCEL = '@@transactions/GET_CANCEL'
export const GET_SUCCESS = '@@transactions/GET_SUCCESS'
export const GET_ERROR = '@@transactions/GET_ERROR'
export const SET_ACTIVE = '@@transactions/SET_ACTIVE'
export const SEARCH = '@@transactions/SEARCH'
export const SEARCH_SUCCESS = '@@transactions/SEARCH_SUCCESS'
export const SEARCH_ERROR = '@@transactions/SEARCH_ERROR'
export const SET_INVALID_FIELD = '@@transactions/SET_INVALID_FIELD'
export const SET_BLOCK_EXPLORER_ERROR = '@@transactions/SET_BLOCK_EXPLORER_ERROR'
export const REPEAT = '@@transactions/REPEAT'
export const CLEAN = '@@transactions/CLEAN'

export const open = (): { type: string } => ({
  type: OPEN,
})

export const close = (): { type: string } => ({
  type: CLOSE,
})

export const reset = (): { type: string } => ({
  type: RESET,
})

export const setLoading = (isLoading: boolean): {
  type: string,
  payload: {
    isLoading: boolean,
  },
} => ({
  type: SET_LOADING,
  payload: {
    isLoading,
  },
})

export const get = (): { type: string } => ({
  type: GET,
})

export const getCancel = (): { type: string } => ({
  type: GET_CANCEL,
})

export const getSuccess = (items: Transactions): {
  type: string,
  payload: {
    items: Transactions,
  },
} => ({
  type: GET_SUCCESS,
  payload: {
    items,
  },
})

export const getError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: GET_ERROR,
  payload: err,
  error: true,
})

export const setActive = (txHash: Hash): {
  type: string,
  payload: {
    txHash: Hash,
  },
} => ({
  type: SET_ACTIVE,
  payload: {
    txHash,
  },
})

export const search = (searchQuery: string): {
  type: string,
  payload: {
    searchQuery: string,
  },
} => ({
  type: SEARCH,
  payload: {
    searchQuery,
  },
})

export const searchSuccess = (foundTransactions: Hashes): {
  type: string,
  payload: {
    foundTransactions: Hashes,
  },
} => ({
  type: SEARCH_SUCCESS,
  payload: {
    foundTransactions,
  },
})

export const searchError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: SEARCH_ERROR,
  payload: err,
  error: true,
})

export const setInvalidField = (fieldName: string, message: string): {
  type: string,
  payload: {
    fieldName: string,
    message: string,
  },
} => ({
  type: SET_INVALID_FIELD,
  payload: {
    fieldName,
    message,
  },
})

export const setBlockExporerError = (isBlockExplorerError: boolean): {
  type: string,
  payload: {
    isBlockExplorerError: boolean,
  },
} => ({
  type: SET_BLOCK_EXPLORER_ERROR,
  payload: {
    isBlockExplorerError,
  },
})

export const repeat = (txData: Transaction): {
  type: string,
  payload: {
    txData: Transaction,
  },
} => ({
  type: REPEAT,
  payload: {
    txData,
  },
})

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: TransactionsData = {
  items: [],
  foundTransactions: [],
  invalidFields: {},
  searchQuery: '',
  isLoading: false,
  isBlockExplorerError: false,
  activeTxHash: null,
}

const transactions = (
  state: TransactionsData = initialState,
  action: Object,
): Object => {
  const { type, payload }: Object = action

  switch (type) {
    case GET_SUCCESS: {
      return assoc('items', payload.items)(state)
    }

    case SET_LOADING: {
      return assoc('isLoading', payload.isLoading)(state)
    }

    case SET_ACTIVE: {
      return assoc(
        'activeTxHash',
        (state.activeTxHash === payload.txHash) ? null : payload.txHash,
      )(state)
    }

    case SEARCH: {
      return compose(
        assoc('foundTransactions', []),
        assoc('searchQuery', payload.searchQuery),
        assocPath(['invalidFields', 'searchQuery'], null),
      )(state)
    }

    case SEARCH_SUCCESS: {
      return assoc('foundTransactions', payload.foundTransactions)(state)
    }

    case SEARCH_ERROR: {
      return assoc('foundTransactions', [])(state)
    }

    case SET_INVALID_FIELD: {
      return assocPath(['invalidFields', payload.fieldName], payload.message)(state)
    }

    case SET_BLOCK_EXPLORER_ERROR: {
      return assoc('isBlockExplorerError', payload.isBlockExplorerError)(state)
    }

    case CLEAN: {
      return compose(
        assoc('items', []),
        assoc('foundTransactions', []),
        assoc('invalidFields', {}),
        assoc('searchQuery', ''),
        assoc('isLoading', false),
        assoc('isBlockExplorerError', false),
      )(state)
    }

    default: return state
  }
}

export default transactions
