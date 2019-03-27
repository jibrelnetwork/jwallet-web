// @flow

export const ON_OPEN_VIEW = '@@walletsAddresses/ON_OPEN_VIEW'
export const ON_CLOSE_VIEW = '@@walletsAddresses/ON_CLOSE_VIEW'

export const SET_ACTIVE = '@@walletsAddresses/SET_ACTIVE'

export const GET_MORE_ERROR = '@@walletsAddresses/GET_MORE_ERROR'
export const GET_MORE_SUCCESS = '@@walletsAddresses/GET_MORE_SUCCESS'
export const GET_MORE_REQUEST = '@@walletsAddresses/GET_MORE_REQUEST'

export const GET_ETH_BALANCES_ERROR = '@@walletsAddresses/GET_ETH_BALANCES_ERROR'
export const GET_ETH_BALANCES_SUCCESS = '@@walletsAddresses/GET_ETH_BALANCES_SUCCESS'
export const GET_ETH_BALANCES_REQUEST = '@@walletsAddresses/GET_ETH_BALANCES_REQUEST'

export const SET_ADDRESS_NAMES = '@@walletsAddresses/SET_ADDRESS_NAMES'

export const CLEAN = '@@walletsAddresses/CLEAN'

export function onOpenView() {
  return {
    type: ON_OPEN_VIEW,
  }
}

export function onCloseView() {
  return {
    type: ON_CLOSE_VIEW,
  }
}

export function setActive(addressIndex: Index) {
  return {
    type: SET_ACTIVE,
    payload: {
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

export function getMoreSuccess(addresses: Address[]) {
  return {
    type: GET_MORE_SUCCESS,
    payload: {
      addresses,
    },
  }
}

export function getMoreRequest() {
  return {
    type: GET_MORE_REQUEST,
  }
}

export function getBalancesError(err: Error) {
  return {
    type: GET_ETH_BALANCES_ERROR,
    payload: err,
    error: true,
  }
}

export function getBalancesSuccess(balances: WalletsBalances) {
  return {
    type: GET_ETH_BALANCES_SUCCESS,
    payload: {
      balances,
    },
  }
}

export function getBalancesRequest() {
  return {
    type: GET_ETH_BALANCES_REQUEST,
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
  ExtractReturn<typeof onOpenView> |
  ExtractReturn<typeof onCloseView> |
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
