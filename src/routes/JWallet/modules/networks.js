export const NETWORKS_GET_FROM_STORAGE = 'NETWORKS_GET_FROM_STORAGE'
export const NETWORKS_SET = 'NETWORKS_SET'
export const NETWORKS_SET_ACTIVE = 'NETWORKS_SET_ACTIVE'
export const NETWORKS_SAVE_CUSTOM_NETWORK = 'NETWORKS_SAVE_CUSTOM_NETWORK'
export const NETWORKS_REMOVE_CUSTOM_NETWORK = 'NETWORKS_REMOVE_CUSTOM_NETWORK'

export function getNetworksFromStorage() {
  return {
    type: NETWORKS_GET_FROM_STORAGE,
  }
}

export function setNetworks(items, currentActiveIndex) {
  return {
    type: NETWORKS_SET,
    items,
    currentActiveIndex,
  }
}

export function setActiveNetwork(currentActiveIndex) {
  return {
    type: NETWORKS_SET_ACTIVE,
    currentActiveIndex,
  }
}

export function saveCustomNetwork(customNetworkRpc) {
  return {
    type: NETWORKS_SAVE_CUSTOM_NETWORK,
    customNetworkRpc,
  }
}

export function removeCustomNetwork(networkIndex) {
  return {
    type: NETWORKS_REMOVE_CUSTOM_NETWORK,
    networkIndex,
  }
}

const ACTION_HANDLERS = {
  [NETWORKS_GET_FROM_STORAGE]: state => ({
    ...state,
    items: [],
    currentActiveIndex: -1,
    isLoading: true,
  }),
  [NETWORKS_SET]: (state, action) => ({
    ...state,
    items: action.items,
    isLoading: false,
  }),
  [NETWORKS_SET_ACTIVE]: (state, action) => ({
    ...state,
    currentActiveIndex: action.currentActiveIndex,
  }),
}

const initialState = {
  items: [],
  currentActiveIndex: -1,
  isLoading: true,
}

export default function networks(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
