// @flow

import {
  MAINNET,
  NETWORKS,
  NETWORKS_AVAILABLE,
} from 'data/networks'

import { type HistoryState } from '../types'

export function selectCurrentAddressCreatedBlockNumber(state: HistoryState) {
  return state.config.createdBlockNumber || 0
}

export function selectCurrentAddress(state: HistoryState) {
  return state.config.address
}

export function selectCurrentAssets(state: HistoryState) {
  return state.config.digitalAssets
}

export function selectCurrentNetworkId(state: HistoryState) {
  const { networkId } = state.config

  if (NETWORKS_AVAILABLE.indexOf(networkId) >= 0) {
    return networkId
  }

  console.error(`Network "${networkId}" is not available, using "${MAINNET}" instead`)

  return MAINNET
}

export function selectCurrentNetwork(state: HistoryState) {
  const id = selectCurrentNetworkId(state)

  return NETWORKS[id]
}

export function selectDBInstance(state: HistoryState) {
  return state.config.db
}
