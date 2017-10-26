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

export function setNetworks(items = [], currentActiveIndex = 0) {
  return {
    type: NETWORKS_SET,
    items,
    currentActiveIndex,
  }
}

export function setCurrentNetwork(currentActiveIndex = 0) {
  return {
    type: NETWORKS_SET_CURRENT,
    currentActiveIndex,
  }
}

export function setCustomNetworkValue(customNetworkRpc = '') {
  return {
    type: NETWORKS_SET_CUSTOM_NETWORK_VALUE,
    customNetworkRpc,
  }
}

export function saveCustomNetwork(customNetworkRpc = '', onSuccess = null, onError = null) {
  return {
    type: NETWORKS_SAVE_CUSTOM_NETWORK,
    customNetworkRpc,
    onSuccess,
    onError,
  }
}

export function removeCustomNetwork(networkIndex = 0) {
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
    currentActiveIndex: action.currentActiveIndex,
    isLoading: false,
  }),
  [NETWORKS_SET_CURRENT]: (state, action) => ({
    ...state,
    currentActiveIndex: action.currentActiveIndex,
  }),
  [NETWORKS_SET_CUSTOM_NETWORK_VALUE]: (state, action) => ({
    ...state,
    customNetworkRpc: action.customNetworkRpc,
  }),
}

const initialState = {
  items: [],
  customNetworkRpc: '',
  currentActiveIndex: -1,
  isLoading: true,
}

export default function networks(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
