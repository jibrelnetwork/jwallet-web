// @flow strict

import {
  MAINNET,
  NETWORKS,
  NETWORKS_AVAILABLE,
} from 'data/networks'

import { type HistoryState } from '../types'

export function selectCurrentNetworkId(state: HistoryState) {
  const { id } = state.network

  if (NETWORKS_AVAILABLE.indexOf(id) >= 0) {
    return id
  }

  console.error(`Network "${id}" is not available`)

  return MAINNET
}

export function selectCurrentNetwork(state: HistoryState) {
  const id = selectCurrentNetworkId(state)

  return NETWORKS[id]
}
