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
  owner: OwnerAddress,
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
