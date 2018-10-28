// @flow

/* eslint-disable max-len */
export const OPEN_VIEW: '@@walletsAddresses/OPEN_VIEW' = '@@walletsAddresses/OPEN_VIEW'
export const CLOSE_VIEW: '@@walletsAddresses/CLOSE_VIEW' = '@@walletsAddresses/CLOSE_VIEW'

export const SET_ACTIVE: '@@walletsAddresses/SET_ACTIVE' = '@@walletsAddresses/SET_ACTIVE'

export const GET_MORE_ERROR: '@@walletsAddresses/GET_MORE_ERROR' = '@@walletsAddresses/GET_MORE_ERROR'
export const GET_MORE_SUCCESS: '@@walletsAddresses/GET_MORE_SUCCESS' = '@@walletsAddresses/GET_MORE_SUCCESS'
export const GET_MORE_REQUEST: '@@walletsAddresses/GET_MORE_REQUEST' = '@@walletsAddresses/GET_MORE_REQUEST'

export const GET_ETH_BALANCES_ERROR: '@@walletsAddresses/GET_ETH_BALANCES_ERROR' = '@@walletsAddresses/GET_ETH_BALANCES_ERROR'
export const GET_ETH_BALANCES_SUCCESS: '@@walletsAddresses/GET_ETH_BALANCES_SUCCESS' = '@@walletsAddresses/GET_ETH_BALANCES_SUCCESS'
export const GET_ETH_BALANCES_REQUEST: '@@walletsAddresses/GET_ETH_BALANCES_REQUEST' = '@@walletsAddresses/GET_ETH_BALANCES_REQUEST'

export const SET_ADDRESS_NAMES: '@@walletsAddresses/SET_ADDRESS_NAMES' = '@@walletsAddresses/SET_ADDRESS_NAMES'

export const CLEAN: '@@walletsAddresses/CLEAN' = '@@walletsAddresses/CLEAN'
/* eslint-enable max-len */

export function openView(walletId: string) {
  return {
    type: OPEN_VIEW,
    payload: {
      walletId,
    },
  }
}

export function closeView() {
  return {
    type: CLOSE_VIEW,
  }
}

export function setActive(items: Wallets, walletId: WalletId, addressIndex: Index) {
  return {
    type: SET_ACTIVE,
    payload: {
      items,
      walletId,
      addressIndex,
    },
  }
}

export function getMoreError(err: Error) {
  return {
    type: GET_MORE_ERROR,
    payload: err,
    error: true,
  }
}

export function getMoreSuccess(addresses: Addresses) {
  return {
    type: GET_MORE_SUCCESS,
    payload: {
      addresses,
    },
  }
}

export function getMoreRequest(
  items: Wallets,
  walletId: WalletId,
  startIndex: Index,
  endIndex: Index,
) {
  return {
    type: GET_MORE_REQUEST,
    payload: {
      items,
      walletId,
      startIndex,
      endIndex,
    },
  }
}

export function getBalancesError(err: Error) {
  return {
    type: GET_ETH_BALANCES_ERROR,
    payload: err,
    error: true,
  }
}

export function getBalancesSuccess(balances: Balances) {
  return {
    type: GET_ETH_BALANCES_SUCCESS,
    payload: {
      balances,
    },
  }
}

export function getBalancesRequest(addresses: Addresses) {
  return {
    type: GET_ETH_BALANCES_REQUEST,
    payload: {
      addresses,
    },
  }
}

export function setAddressNames(addressNames: AddressNames) {
  return {
    type: SET_ADDRESS_NAMES,
    payload: {
      addressNames,
    },
  }
}

export function clean() {
  return {
    type: CLEAN,
  }
}

export type WalletsAddressesAction =
  ExtractReturn<typeof openView> |
  ExtractReturn<typeof closeView> |
  ExtractReturn<typeof setActive> |
  ExtractReturn<typeof getMoreError> |
  ExtractReturn<typeof getMoreSuccess> |
  ExtractReturn<typeof getMoreRequest> |
  ExtractReturn<typeof getBalancesError> |
  ExtractReturn<typeof getBalancesSuccess> |
  ExtractReturn<typeof getBalancesRequest> |
  ExtractReturn<typeof setAddressNames> |
  ExtractReturn<typeof clean>

const initialState: WalletsAddressesState = {
  persist: {
    addressNames: {},
  },
  addresses: [],
  balances: {},
  iteration: 0,
  isLoading: false,
}

function walletsAddresses(
  state: WalletsAddressesState = initialState,
  action: WalletsAddressesAction,
): WalletsAddressesState {
  switch (action.type) {
    case GET_MORE_SUCCESS:
      return {
        ...state,
        addresses: [
          ...state.addresses,
          ...action.payload.addresses,
        ],
        iteration: state.iteration + 1,
      }

    case GET_ETH_BALANCES_REQUEST:
      return {
        ...state,
        isLoading: true,
      }

    case GET_ETH_BALANCES_SUCCESS:
      return {
        ...state,
        balances: {
          ...state.balances,
          ...action.payload.balances,
        },
        isLoading: false,
      }

    case GET_ETH_BALANCES_ERROR:
      return {
        ...state,
        balances: initialState.balances,
        isLoading: false,
      }

    case SET_ADDRESS_NAMES:
      return {
        ...state,
        persist: {
          ...state.persist,
          addressNames: action.payload.addressNames,
        },
      }

    case CLEAN:
      return {
        ...initialState,
        persist: state.persist,
      }

    default:
      return state
  }
}

export default walletsAddresses
