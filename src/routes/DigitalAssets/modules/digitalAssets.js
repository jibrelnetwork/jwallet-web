// @flow

import { assoc, assocPath, compose } from 'ramda'

export const INIT = '@@digitalAssets/INIT'
export const OPEN = '@@digitalAssets/OPEN'
export const CLOSE = '@@digitalAssets/CLOSE'
export const SET_ASSETS = '@@digitalAssets/SET_ASSETS'
export const SET_ASSETS_SUCCESS = '@@digitalAssets/SET_ASSETS_SUCCESS'
export const SET_ACTIVE = '@@digitalAssets/SET_ACTIVE'
export const SET_CURRENT = '@@digitalAssets/SET_CURRENT'
export const GET_BALANCES = '@@digitalAssets/GET_BALANCES'
export const GET_BALANCES_SUCCESS = '@@digitalAssets/GET_BALANCES_SUCCESS'
export const GET_BALANCES_ERROR = '@@digitalAssets/GET_BALANCES_ERROR'
export const SET_BALANCE_BY_ADDRESS = '@@digitalAssets/SET_BALANCE_BY_ADDRESS'
export const SET_BALANCE_BY_ADDRESS_SUCCESS = '@@digitalAssets/SET_BALANCE_BY_ADDRESS_SUCCESS'
export const SEARCH = '@@digitalAssets/SEARCH'
export const SEARCH_SUCCESS = '@@digitalAssets/SEARCH_SUCCESS'
export const SEARCH_ERROR = '@@digitalAssets/SEARCH_ERROR'
export const SET_INVALID_FIELD = '@@digitalAssets/SET_INVALID_FIELD'
export const CLEAN = '@@digitalAssets/CLEAN'

export const init = (): { type: string } => ({
  type: INIT,
})

export const open = (): { type: string } => ({
  type: OPEN,
})

export const close = (): { type: string } => ({
  type: CLOSE,
})

export const setAssets = (items: ?DigitalAssets): {
  type: string,
  payload: {
    items: ?DigitalAssets,
  },
} => ({
  type: SET_ASSETS,
  payload: {
    items,
  },
})

export const setAssetsSuccess = (items: DigitalAssets): {
  type: string,
  payload: {
    items: DigitalAssets,
  },
} => ({
  type: SET_ASSETS_SUCCESS,
  payload: {
    items,
  },
})

export const setActive = (address: Address): {
  type: string,
  payload: {
    address: Address,
  },
} => ({
  type: SET_ACTIVE,
  payload: {
    address,
  },
})

export const setCurrent = (currentAddress: ?Address): {
  type: string,
  payload: {
    currentAddress: ?Address,
  },
} => ({
  type: SET_CURRENT,
  payload: {
    currentAddress,
  },
})

export const getBalances = (): { type: string } => ({
  type: GET_BALANCES,
})

export const getBalancesSuccess = (balances: Balances): {
  type: string,
  payload: {
    balances: Balances,
  },
} => ({
  type: GET_BALANCES_SUCCESS,
  payload: {
    balances,
  },
})

export const getBalancesError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: GET_BALANCES_ERROR,
  payload: err,
  error: true,
})

export const setBalanceByAddress = (address: Address, balance: number): {
  type: string,
  payload: {
    address: Address,
    balance: number,
  },
} => ({
  type: SET_BALANCE_BY_ADDRESS,
  payload: {
    address,
    balance,
  },
})

export const setBalanceByAddressSuccess = (balances: Balances): {
  type: string,
  payload: {
    balances: Balances,
  },
} => ({
  type: SET_BALANCE_BY_ADDRESS_SUCCESS,
  payload: {
    balances,
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

export const searchSuccess = (foundAssets: Addresses): {
  type: string,
  payload: {
    foundAssets: Addresses,
  },
} => ({
  type: SEARCH_SUCCESS,
  payload: {
    foundAssets,
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

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: DigitalAssetsData = {
  items: [],
  foundAssets: [],
  balances: {},
  invalidFields: {},
  searchQuery: '',
  currentAddress: null,
  isBalancesLoading: false,
}

const digitalAssets = (
  state: DigitalAssetsData = initialState,
  action: FSA,
): Object => {
  const { type, payload }: FSA = action

  switch (type) {
    case SET_ASSETS_SUCCESS: {
      return assoc('items', payload.items)(state)
    }

    case SET_CURRENT: {
      return assoc('currentAddress', payload.currentAddress)(state)
    }

    case GET_BALANCES: {
      return compose(
        assoc('balances', {}),
        assoc('isBalancesLoading', true),
      )(state)
    }

    case GET_BALANCES_SUCCESS: {
      return compose(
        assoc('balances', payload.balances),
        assoc('isBalancesLoading', false),
      )(state)
    }

    case GET_BALANCES_ERROR: {
      return compose(
        assoc('balances', {}),
        assoc('isBalancesLoading', false),
      )(state)
    }

    case SET_BALANCE_BY_ADDRESS_SUCCESS: {
      return assoc('balances', payload.balances)(state)
    }

    case SEARCH: {
      return compose(
        assoc('foundAssets', []),
        assoc('searchQuery', payload.searchQuery),
        assocPath(['invalidFields', 'searchQuery'], null),
      )(state)
    }

    case SEARCH_SUCCESS: {
      return assoc('foundAssets', payload.foundAssets)(state)
    }

    case SEARCH_ERROR: {
      return compose(
        assoc('foundAssets', []),
        assoc('searchQuery', ''),
      )(state)
    }

    case SET_INVALID_FIELD: {
      return assocPath(['invalidFields', payload.fieldName], payload.message)(state)
    }

    case CLEAN: {
      return compose(
        assoc('foundAssets', []),
        assoc('balances', {}),
        assoc('invalidFields', {}),
        assoc('searchQuery', ''),
        assoc('isBalancesLoading', false),
      )(state)
    }

    default: return state
  }
}

export default digitalAssets
