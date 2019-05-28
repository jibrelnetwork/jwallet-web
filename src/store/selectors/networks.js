// @flow strict

import { ActiveNetworkNotFoundError } from 'errors'

export function selectNetworks(state: AppState): NetworksState {
  return state.networks
}

export function selectNetworksItems(state: AppState): Networks {
  const networks: NetworksState = selectNetworks(state)

  return networks.items
}

export function selectNetworksPersist(state: AppState): NetworksPersist {
  const networks: NetworksState = selectNetworks(state)

  return networks.persist
}

export function selectCurrentNetworkId(state: AppState): NetworkId {
  const networksPersist: NetworksPersist = selectNetworksPersist(state)

  return networksPersist.currentNetworkId
}

export function selectCurrentNetworkIdOrThrow(state: AppState): NetworkId {
  const networkId = selectCurrentNetworkId(state)

  if (!networkId) {
    throw new ActiveNetworkNotFoundError()
  }

  return networkId
}

export function selectCurrentNetwork(state: AppState): ?Network {
  const {
    items,
    persist,
  }: NetworksState = selectNetworks(state)

  return items[persist.currentNetworkId]
}

export function selectCurrentNetworkOrThrow(state: AppState): Network {
  const network = selectCurrentNetwork(state)

  if (!network) {
    throw new ActiveNetworkNotFoundError()
  }

  return network
}

export function selectCurrentNetworkName(state: AppState): ?string {
  const currentNetwork = selectCurrentNetwork(state)

  if (currentNetwork) {
    return currentNetwork.title
  }

  return null
}

export function selectNetworkById(state: AppState, networkId: NetworkId): ?Network {
  const networksItems: Networks = selectNetworksItems(state)

  return networksItems[networkId]
}
