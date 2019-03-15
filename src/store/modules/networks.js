// @flow

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

export function init() {
  return {
    type: INIT,
  }
}

export function initFinish() {
  return {
    type: INIT_FINISH,
  }
}

export function setNetworks(items: ?Networks) {
  return {
    type: SET_NETWORKS,
    payload: {
      items,
    },
  }
}

export function setNetworksSuccess(items: Networks) {
  return {
    type: SET_NETWORKS_SUCCESS,
    payload: {
      items,
    },
  }
}

export function setNetworksError(err: Error) {
  return {
    type: SET_NETWORKS_ERROR,
    payload: err,
    error: true,
  }
}

export function setCustomNetworkRPC(customNetworkRPC: string) {
  return {
    type: SET_CUSTOM_NETWORK_RPC,
    payload: {
      customNetworkRPC,
    },
  }
}

export function setCurrentNetwork(currentNetwork: ?NetworkId) {
  return {
    type: SET_CURRENT,
    payload: {
      currentNetwork,
    },
  }
}

export function setCurrentNetworkSuccess(currentNetwork: NetworkId) {
  return {
    type: SET_CURRENT_SUCCESS,
    payload: {
      currentNetwork,
    },
  }
}

export function setCurrentNetworkError(err: Error) {
  return {
    type: SET_CURRENT_ERROR,
    payload: err,
    error: true,
  }
}

export function saveCustomNetwork() {
  return {
    type: SAVE_CUSTOM_NETWORK,
  }
}

export function saveCustomNetworkSuccess(newNetworks: Networks) {
  return {
    type: SAVE_CUSTOM_NETWORK_SUCCESS,
    payload: {
      newNetworks,
    },
  }
}

export function saveCustomNetworkError(err: Error) {
  return {
    type: SAVE_CUSTOM_NETWORK_ERROR,
    payload: err,
    error: true,
  }
}

export function removeCustomNetwork(networkId: NetworkId) {
  return {
    type: REMOVE_CUSTOM_NETWORK,
    payload: {
      networkId,
    },
  }
}

type NetworksAction =
  ExtractReturn<typeof init> |
  ExtractReturn<typeof initFinish> |
  ExtractReturn<typeof setNetworks> |
  ExtractReturn<typeof setNetworksSuccess> |
  ExtractReturn<typeof setNetworksError> |
  ExtractReturn<typeof setCustomNetworkRPC> |
  ExtractReturn<typeof setCurrentNetwork> |
  ExtractReturn<typeof setCurrentNetworkSuccess> |
  ExtractReturn<typeof setCurrentNetworkError> |
  ExtractReturn<typeof saveCustomNetwork> |
  ExtractReturn<typeof saveCustomNetworkSuccess> |
  ExtractReturn<typeof saveCustomNetworkError> |
  ExtractReturn<typeof removeCustomNetwork>

const initialState: NetworksState = {
  persist: {
    items: {
      '3': {
        id: '3',
        title: 'Ropsten Test Network',
        blockExplorerUISubdomain: 'ropsten',
        rpcaddr: 'ropsten.jnode.network',
        rpcport: 443,
        ssl: true,
        isCustom: false,
      },
      '1': {
        id: '1',
        blockExplorerUISubdomain: '',
        title: 'Main Ethereum Network',
        rpcaddr: 'main.jnode.network',
        rpcport: 443,
        ssl: true,
        isCustom: false,
      },
    },
    currentNetworkId: '1',
  },
}

function networks(
  state: NetworksState = initialState,
  action: NetworksAction,
): NetworksState {
  switch (action.type) {
    // case INIT_FINISH: {
    //   return assoc('isInitialised', true)(state)
    // }

    // case SET_NETWORKS: {
    //   return assoc('isLoading', true)(state)
    // }

    // case SET_NETWORKS_SUCCESS: {
    //   return compose(
    //     assoc('items', action.payload.items),
    //     assoc('isLoading', false),
    //   )(state)
    // }

    // case SET_NETWORKS_ERROR: {
    //   return assoc('isLoading', false)(state)
    // }

    // case SET_CURRENT_SUCCESS: {
    //   return assoc('currentNetwork', action.payload.currentNetwork)(state)
    // }

    // case SET_CUSTOM_NETWORK_RPC: {
    //   return assoc('customNetworkRPC', action.payload.customNetworkRPC)(state)
    // }

    // case SAVE_CUSTOM_NETWORK_SUCCESS: {
    //   return compose(
    //     assoc('items', action.payload.newNetworks),
    //     assoc('customNetworkRPC', ''),
    //   )(state)
    // }

    // case SET_INVALID_FIELD: {
    // return assocPath(['invalidFields', action.payload.fieldName], action.payload.message)(state)
    // }

    default:
      return state
  }
}

export default networks
