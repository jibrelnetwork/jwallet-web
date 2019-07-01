// @flow strict

import { type HistoryState } from '../types'

export function selectLatestBlock(state: HistoryState, networkId: string): ?BlockData {
  const blocksByNetworkId: ?Blocks = state.blocks.items[networkId]

  return blocksByNetworkId ? blocksByNetworkId.latest : null
}

export function selectCurrentBlock(state: HistoryState, networkId: string): ?BlockData {
  const blocksByNetworkId: ?Blocks = state.blocks.items[networkId]

  return blocksByNetworkId ? blocksByNetworkId.current : null
}

export function selectProcessingBlock(state: HistoryState, networkId: string): ?BlockData {
  const blocksByNetworkId: ?Blocks = state.blocks.items[networkId]

  return blocksByNetworkId ? blocksByNetworkId.processing : null
}

export function selectInitialBlockNumber(state: HistoryState): ?number {
  return state.blocks.initialBlockNumber
}
