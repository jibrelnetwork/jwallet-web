// @flow

export function selectTransactions(state: AppState): TransactionsState {
  return state.transactions
}

export function selectTransactionsPersist(state: AppState): TransactionsPersist {
  const transactions: TransactionsState = selectTransactions(state)

  return transactions.persist
}

export function selectTransactionsItems(state: AppState): TransactionsItems {
  const transactionsPersist: TransactionsPersist = selectTransactionsPersist(state)

  return transactionsPersist.items
}

export function selectPendingTransactionsItems(state: AppState): PendingTransactionsItems {
  const transactionsPersist: TransactionsPersist = selectTransactionsPersist(state)

  return transactionsPersist.pending
}

export function selectTransactionsByNetworkId(
  state: AppState,
  networkId: NetworkId,
): ?TransactionsByNetworkId {
  const transactionsItems: TransactionsItems = selectTransactionsItems(state)

  return transactionsItems[networkId]
}

export function selectTransactionsByOwner(
  state: AppState,
  networkId: NetworkId,
  owner: ?OwnerAddress,
): ?TransactionsByOwner {
  if (!owner) {
    return null
  }

  const byNetworkId: ?TransactionsByNetworkId = selectTransactionsByNetworkId(state, networkId)

  if (!byNetworkId) {
    return null
  }

  return byNetworkId[owner]
}

export function selectTransactionsByAsset(
  state: AppState,
  networkId: NetworkId,
  owner: ?OwnerAddress,
  asset: AssetAddress,
): ?TransactionsByAssetAddress {
  const byOwner: ?TransactionsByOwner = selectTransactionsByOwner(state, networkId, owner)

  if (!byOwner) {
    return null
  }

  return byOwner[asset]
}

export function selectTransactionsByBlockNumber(
  state: AppState,
  networkId: NetworkId,
  owner: OwnerAddress,
  asset: AssetAddress,
  blockNumber: BlockNumber,
): ?TransactionsByBlockNumber {
  const byAssetAddress: ?TransactionsByAssetAddress = selectTransactionsByAsset(
    state,
    networkId,
    owner,
    asset,
  )

  if (!byAssetAddress) {
    return null
  }

  return byAssetAddress[blockNumber]
}

export function selectTransactionById(
  state: AppState,
  networkId: NetworkId,
  owner: OwnerAddress,
  asset: AssetAddress,
  blockNumber: BlockNumber,
  id: TransactionId,
): ?Transaction {
  const byBlockNumber: ?TransactionsByBlockNumber = selectTransactionsByBlockNumber(
    state,
    networkId,
    owner,
    asset,
    blockNumber,
  )

  if (!(byBlockNumber && byBlockNumber.items)) {
    return null
  }

  return byBlockNumber.items[id]
}

export function selectPendingTransactionsByNetworkId(
  state: AppState,
  networkId: NetworkId,
): ?PendingTransactionsByNetworkId {
  const transactionsPending: PendingTransactionsItems = selectPendingTransactionsItems(state)

  return transactionsPending[networkId]
}

export function selectPendingTransactionsByOwner(
  state: AppState,
  networkId: NetworkId,
  owner: ?OwnerAddress,
): ?PendingTransactionsByOwner {
  if (!owner) {
    return null
  }

  const byNetworkId: ?PendingTransactionsByNetworkId = selectPendingTransactionsByNetworkId(
    state,
    networkId,
  )

  if (!byNetworkId) {
    return null
  }

  return byNetworkId[owner]
}

export function selectPendingTransactionsByAsset(
  state: AppState,
  networkId: NetworkId,
  owner: ?OwnerAddress,
  asset: AssetAddress,
): ?Transactions {
  const byOwner: ?PendingTransactionsByOwner = selectPendingTransactionsByOwner(
    state,
    networkId,
    owner,
  )

  if (!byOwner) {
    return null
  }

  return byOwner[asset]
}

export function selectPendingTransactionByHash(
  state: AppState,
  networkId: NetworkId,
  owner: OwnerAddress,
  asset: AssetAddress,
  txHash: Hash,
): ?Transaction {
  const byAsset: ?Transactions = selectPendingTransactionsByAsset(
    state,
    networkId,
    owner,
    asset,
  )

  if (!byAsset) {
    return null
  }

  return byAsset[txHash]
}
