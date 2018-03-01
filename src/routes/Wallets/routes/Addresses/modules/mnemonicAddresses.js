// @flow

import { assoc, compose } from 'ramda'

export const OPEN = '@@mnemonicAddresses/OPEN'
export const CLOSE = '@@mnemonicAddresses/CLOSE'
export const SET_ACTIVE = '@@mnemonicAddresses/SET_ACTIVE'
export const SET_ACTIVE_SUCCESS = '@@mnemonicAddresses/SET_ACTIVE_SUCCESS'
export const SET_ACTIVE_ERROR = '@@mnemonicAddresses/SET_ACTIVE_ERROR'
export const GET_MORE = '@@mnemonicAddresses/GET_MORE'
export const GET_MORE_SUCCESS = '@@mnemonicAddresses/GET_MORE_SUCCESS'
export const GET_MORE_ERROR = '@@mnemonicAddresses/GET_MORE_ERROR'
export const GET_ETH_BALANCES = '@@mnemonicAddresses/GET_ETH_BALANCES'
export const GET_ETH_BALANCES_SUCCESS = '@@mnemonicAddresses/GET_ETH_BALANCES_SUCCESS'
export const GET_ETH_BALANCES_ERROR = '@@mnemonicAddresses/GET_ETH_BALANCES_ERROR'
export const CLEAN = '@@mnemonicAddresses/CLEAN'

export const open = (): { type: string } => ({
  type: OPEN,
})

export const close = (): { type: string } => ({
  type: CLOSE,
})

export const setActive = (addressIndex: Index): {
  type: string,
  payload: {
    addressIndex: Index,
  },
} => ({
  type: SET_ACTIVE,
  payload: {
    addressIndex,
  },
})

export const setActiveSuccess = (addressIndex: Index): {
  type: string,
  payload: {
    addressIndex: Index,
  },
} => ({
  type: SET_ACTIVE_SUCCESS,
  payload: {
    addressIndex,
  },
})

export const setActiveError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: SET_ACTIVE_ERROR,
  payload: err,
  error: true,
})

export const getMore = (): { type: string } => ({
  type: GET_MORE,
})

export const getMoreSuccess = (addresses: Addresses, iteration: Index): {
  type: string,
  payload: {
    addresses: Addresses,
    iteration: Index,
  },
} => ({
  type: GET_MORE_SUCCESS,
  payload: {
    addresses,
    iteration,
  },
})

export const getMoreError = (err: Object): { type: string, payload: Object, error: boolean } => ({
  type: GET_MORE_ERROR,
  payload: err,
  error: true,
})

export const getBalances = (addresses: Addresses): {
  type: string,
  payload: {
    addresses: Addresses,
  },
} => ({
  type: GET_ETH_BALANCES,
  payload: {
    addresses,
  },
})

export const getBalancesSuccess = (balances: Balances): {
  type: string,
  payload: {
    balances: Balances,
  },
} => ({
  type: GET_ETH_BALANCES_SUCCESS,
  payload: {
    balances,
  },
})

export const getBalancesError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: GET_ETH_BALANCES_ERROR,
  payload: err,
  error: true,
})

export const clean = (): { type: string } => ({
  type: CLEAN,
})

const initialState: MnemonicAddressesData = {
  addresses: [],
  balances: {},
  iteration: 0,
  isBalanceLoading: false,
}

const mnemonicAddresses = (
  state: MnemonicAddressesData = initialState,
  action: FSA,
): Object => {
  const { type, payload }: FSA = action

  switch (type) {
    case GET_MORE_SUCCESS: {
      return compose(
        assoc('addresses', payload.addresses),
        assoc('iteration', payload.iteration),
      )(state)
    }

    case GET_ETH_BALANCES: {
      return assoc('isBalanceLoading', true)(state)
    }

    case GET_ETH_BALANCES_SUCCESS: {
      return compose(
        assoc('balances', payload.balances),
        assoc('isBalanceLoading', false),
      )(state)
    }

    case GET_ETH_BALANCES_ERROR: {
      return compose(
        assoc('balances', {}),
        assoc('isBalanceLoading', false),
      )(state)
    }

    case CLEAN: return initialState

    default: return state
  }
}

export default mnemonicAddresses
