// @flow

export function selectNetworks(state: AppState): NetworksState {
  return state.networks
}

export function selectNetworksPersist(state: AppState): NetworksPersist {
  const networks: NetworksState = selectNetworks(state)

  return networks.persist
}

export function selectNetworksItems(state: AppState): Networks {
  const networksPersist: NetworksPersist = selectNetworksPersist(state)

  return networksPersist.items
}

export function selectCurrentNetworkId(state: AppState): NetworkId {
  const networksPersist: NetworksPersist = selectNetworksPersist(state)

  return networksPersist.currentNetworkId
}

export function selectCurrentNetwork(state: AppState): ?Network {
  const {
    items,
    currentNetworkId,
  }: NetworksPersist = selectNetworksPersist(state)

  return items[currentNetworkId]
}

export function selectNetworkById(state: AppState, networkId: NetworkId): ?Network {
  const networksItems: Networks = selectNetworksItems(state)

  return networksItems[networkId]
}
