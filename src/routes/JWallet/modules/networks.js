export const GET_NETWORKS_FROM_CACHE = 'GET_NETWORKS_FROM_CACHE'
export const SET_NETWORKS = 'SET_NETWORKS'
export const SET_ACTIVE_NETWORK = 'SET_ACTIVE_NETWORK'
export const SAVE_CUSTOM_NETWORK = 'SAVE_CUSTOM_NETWORK'
export const REMOVE_CUSTOM_NETWORK = 'REMOVE_CUSTOM_NETWORK'

export function getNetworksFromCache() {
  return {
    type: GET_NETWORKS_FROM_CACHE,
  }
}

export function setNetworks(items, currentActiveIndex) {
  return {
    type: SET_NETWORKS,
    items,
    currentActiveIndex,
  }
}

export function setActiveNetwork(currentActiveIndex) {
  return {
    type: SET_ACTIVE_NETWORK,
    currentActiveIndex,
  }
}

export function saveCustomNetwork(customNetworkRpc) {
  return {
    type: SAVE_CUSTOM_NETWORK,
    customNetworkRpc,
  }
}

export function removeCustomNetwork(networkIndex) {
  return {
    type: REMOVE_CUSTOM_NETWORK,
    networkIndex,
  }
}

const ACTION_HANDLERS = {
  [GET_NETWORKS_FROM_CACHE]: state => ({
    ...state,
    items: [],
    currentActiveIndex: -1,
    isLoading: true,
  }),
  [SET_NETWORKS]: (state, action) => ({
    ...state,
    items: action.items,
    isLoading: false,
  }),
  [SET_ACTIVE_NETWORK]: (state, action) => ({
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
