// @flow

export function selectLatestBlock(state: AppState, networkId: NetworkId): ?BlockInfo {
  const { items } = state.blocks.persist

  if (items[networkId] && items[networkId].latestBlock) {
    return items[networkId].latestBlock
  }

  return null
}

export function selectCurrentBlock(state: AppState, networkId: NetworkId): ?BlockInfo {
  const { items } = state.blocks.persist

  if (items[networkId] && items[networkId].latestBlock) {
    return items[networkId].currentBlock
  }

  return null
}

export function selectCurrentBlockNumber(state: AppState, networkId: NetworkId): ?number {
  const block = selectCurrentBlock(state, networkId)
  return block ? block.number : null
}

export function selectProcessingBlock(state: AppState, networkId: NetworkId): ?BlockInfo {
  const { items } = state.blocks.persist

  if (items[networkId] && items[networkId].latestBlock) {
    return items[networkId].processingBlock
  }

  return null
}
