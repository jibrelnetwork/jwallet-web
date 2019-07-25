// @flow strict

import { selectCurrentNetworkId } from 'store/selectors/networks'

export function selectBlocks(state: AppState): BlocksState {
  return state.blocks
}

export function selectBlocksPersist(state: AppState): BlocksPersist {
  const blocks: BlocksState = selectBlocks(state)

  return blocks.persist
}

export function selectBlocksItems(state: AppState): BlocksByNetworkId {
  const blocksPersist: BlocksPersist = selectBlocksPersist(state)

  return blocksPersist.items
}

export function selectBlocksByNetworkId(
  state: AppState,
  networkIdOptional?: NetworkId,
): ?Blocks {
  const networkId: NetworkId = networkIdOptional || selectCurrentNetworkId(state)
  const blocksItems: BlocksByNetworkId = selectBlocksItems(state)

  return blocksItems[networkId]
}

export function selectLatestBlock(
  state: AppState,
  networkIdOptional?: NetworkId,
): ?BlockData {
  const networkId: NetworkId = networkIdOptional || selectCurrentNetworkId(state)
  const blocksByNetworkId: ?Blocks = selectBlocksByNetworkId(state, networkId)

  return blocksByNetworkId ? blocksByNetworkId.latest : null
}

export function selectCurrentBlock(
  state: AppState,
  networkIdOptional?: NetworkId,
): ?BlockData {
  const networkId: NetworkId = networkIdOptional || selectCurrentNetworkId(state)
  const blocksByNetworkId: ?Blocks = selectBlocksByNetworkId(state, networkId)

  return blocksByNetworkId ? blocksByNetworkId.current : null
}

export function selectProcessingBlock(
  state: AppState,
  networkIdOptional?: NetworkId,
): ?BlockData {
  const networkId: NetworkId = networkIdOptional || selectCurrentNetworkId(state)
  const blocksByNetworkId: ?Blocks = selectBlocksByNetworkId(state, networkId)

  return blocksByNetworkId ? blocksByNetworkId.processing : null
}
