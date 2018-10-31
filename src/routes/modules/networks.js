// @flow

import { assoc, assocPath, compose } from 'ramda'

export const INIT = '@@networks/INIT'
export const INIT_FINISH = '@@networks/INIT_FINISH'
export const SET_NETWORKS = '@@networks/SET_NETWORKS'
export const SET_NETWORKS_SUCCESS = '@@networks/SET_NETWORKS_SUCCESS'
export const SET_NETWORKS_ERROR = '@@networks/SET_NETWORKS_ERROR'
export const SET_CURRENT = '@@networks/SET_CURRENT'
export const SET_CURRENT_SUCCESS = '@@networks/SET_CURRENT_SUCCESS'
export const SET_CURRENT_ERROR = '@@networks/SET_CURRENT_ERROR'
export const SET_CUSTOM_NETWORK_RPC = '@@networks/SET_CUSTOM_NETWORK_RPC'
export const SAVE_CUSTOM_NETWORK = '@@networks/SAVE_CUSTOM_NETWORK'
export const SAVE_CUSTOM_NETWORK_SUCCESS = '@@networks/SAVE_CUSTOM_NETWORK_SUCCESS'
export const SAVE_CUSTOM_NETWORK_ERROR = '@@networks/SAVE_CUSTOM_NETWORK_ERROR'
export const SET_INVALID_FIELD = '@@networks/SET_INVALID_FIELD'
export const REMOVE_CUSTOM_NETWORK = '@@networks/REMOVE_CUSTOM_NETWORK'

export const init = (): { type: string } => ({
  type: INIT,
})

export const initFinish = (): { type: string } => ({
  type: INIT_FINISH,
})

export const setNetworks = (items: ?Networks): {
  type: string,
  payload: {
    items: ?Networks,
  },
} => ({
  type: SET_NETWORKS,
  payload: {
    items,
  },
})

export const setNetworksSuccess = (items: Networks): {
  type: string,
  payload: {
    items: Networks,
  },
} => ({
  type: SET_NETWORKS_SUCCESS,
  payload: {
    items,
  },
})

export const setNetworksError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: SET_NETWORKS_ERROR,
  payload: err,
  error: true,
})

export const setCustomNetworkRPC = (customNetworkRPC: string): {
  type: string,
  payload: {
    customNetworkRPC: string,
  },
} => ({
  type: SET_CUSTOM_NETWORK_RPC,
  payload: {
    customNetworkRPC,
  },
})

export const setCurrentNetwork = (currentNetwork: ?NetworkId): {
  type: string,
  payload: {
    currentNetwork: ?NetworkId,
  },
} => ({
  type: SET_CURRENT,
  payload: {
    currentNetwork,
  },
})

export const setCurrentNetworkSuccess = (currentNetwork: NetworkId): {
  type: string,
  payload: {
    currentNetwork: NetworkId,
  },
} => ({
  type: SET_CURRENT_SUCCESS,
  payload: {
    currentNetwork,
  },
})

export const setCurrentNetworkError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: SET_CURRENT_ERROR,
  payload: err,
  error: true,
})

export const saveCustomNetwork = (): { type: string } => ({
  type: SAVE_CUSTOM_NETWORK,
})

export const saveCustomNetworkSuccess = (newNetworks: Networks): {
  type: string,
  payload: {
    newNetworks: Networks,
  },
} => ({
  type: SAVE_CUSTOM_NETWORK_SUCCESS,
  payload: {
    newNetworks,
  },
})

export const saveCustomNetworkError = (err: Object): {
  type: string,
  payload: Object,
  error: boolean,
} => ({
  type: SAVE_CUSTOM_NETWORK_ERROR,
  payload: err,
  error: true,
})

export const removeCustomNetwork = (networkId: NetworkId): {
  type: string,
  payload: {
    networkId: NetworkId,
  },
} => ({
  type: REMOVE_CUSTOM_NETWORK,
  payload: {
    networkId,
  },
})

const initialState: NetworksData = {
  items: [],
  invalidFields: {},
  customNetworkRPC: '',
  isLoading: false,
  isInitialised: false,
  currentNetwork: null,
}

const networks = (
  state: NetworksData = initialState,
  action: Object,
): Object => {
  const { type, payload }: Object = action

  switch (type) {
    case INIT_FINISH: {
      return assoc('isInitialised', true)(state)
    }

    case SET_NETWORKS: {
      return assoc('isLoading', true)(state)
    }

    case SET_NETWORKS_SUCCESS: {
      return compose(
        assoc('items', payload.items),
        assoc('isLoading', false),
      )(state)
    }

    case SET_NETWORKS_ERROR: {
      return assoc('isLoading', false)(state)
    }

    case SET_CURRENT_SUCCESS: {
      return assoc('currentNetwork', payload.currentNetwork)(state)
    }

    case SET_CUSTOM_NETWORK_RPC: {
      return assoc('customNetworkRPC', payload.customNetworkRPC)(state)
    }

    case SAVE_CUSTOM_NETWORK_SUCCESS: {
      return compose(
        assoc('items', payload.newNetworks),
        assoc('customNetworkRPC', ''),
      )(state)
    }

    case SET_INVALID_FIELD: {
      return assocPath(['invalidFields', payload.fieldName], payload.message)(state)
    }

    default: return state
  }
}

export default networks
