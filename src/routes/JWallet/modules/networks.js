export const NETWORKS_GET = 'NETWORKS_GET'
export const NETWORKS_SET = 'NETWORKS_SET'
export const NETWORKS_SET_CURRENT = 'NETWORKS_SET_CURRENT'
export const NETWORKS_SET_CUSTOM_NETWORK_VALUE = 'NETWORKS_SET_CUSTOM_NETWORK_VALUE'
export const NETWORKS_SAVE_CUSTOM_NETWORK = 'NETWORKS_SAVE_CUSTOM_NETWORK'
export const NETWORKS_REMOVE_CUSTOM_NETWORK = 'NETWORKS_REMOVE_CUSTOM_NETWORK'

export function getNetworksFromStorage() {
  return {
    type: NETWORKS_GET,
  }
}

export function setCurrentNetwork(currentNetworkIndex) {
  return {
    type: NETWORKS_SET_CURRENT,
    currentNetworkIndex,
  }
}

export function setCustomNetworkValue(customNetworkRpc = '') {
  return {
    type: NETWORKS_SET_CUSTOM_NETWORK_VALUE,
    customNetworkRpc,
  }
}

export function saveCustomNetwork(customNetworkRpc, onSuccess, onError) {
  return {
    type: NETWORKS_SAVE_CUSTOM_NETWORK,
    customNetworkRpc,
    onSuccess,
    onError,
  }
}

export function removeCustomNetwork(networkIndex) {
  return {
    type: NETWORKS_REMOVE_CUSTOM_NETWORK,
    networkIndex,
  }
}

const ACTION_HANDLERS = {
  [NETWORKS_GET]: () => initialState,
  [NETWORKS_SET]: (state, action) => ({
    ...state,
    items: action.items,
    currentNetworkIndex: action.currentNetworkIndex,
    isLoading: false,
  }),
  [NETWORKS_SET_CURRENT]: (state, action) => ({
    ...state,
    currentNetworkIndex: action.currentNetworkIndex,
  }),
  [NETWORKS_SET_CUSTOM_NETWORK_VALUE]: (state, action) => ({
    ...state,
    customNetworkRpc: action.customNetworkRpc,
  }),
}

const initialState = {
  items: [],
  customNetworkRpc: '',
  currentNetworkIndex: 0,
  isLoading: true,
}

export default function networks(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
