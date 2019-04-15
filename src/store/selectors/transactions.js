// @flow

import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import {
  flattenTransactionsByOwner,
  flattenPendingTransactionsByOwner,
} from 'utils/transactions'

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
  id: TransactionId,
  blockNumber?: BlockNumber,
): ?Transaction {
  // search within specific range, if blockNumber was specified
  if (blockNumber) {
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

  // search transaction by id within full list by asset address
  const byAssetAddress: ?TransactionsByAssetAddress = selectTransactionsByAsset(
    state,
    networkId,
    owner,
    asset,
  )

  if (!byAssetAddress) {
    return null
  }

  return Object.keys(byAssetAddress).reduce((
    result: ?Transaction,
    toBlock: BlockNumber,
  ): ?Transaction => {
    if (result) {
      return result
    }

    const byBlockNumber: ?TransactionsByBlockNumber = byAssetAddress[toBlock]

    if (!(byBlockNumber && byBlockNumber.items)) {
      return null
    }

    return byBlockNumber.items[id]
  }, null)
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

export function selectTransactionsList(state: AppState): TransactionWithPrimaryKeys[] {
  const networkID = selectCurrentNetworkId(state)
  const currentAddress = selectActiveWalletAddress(state)
  const transactionsList = selectTransactionsByOwner(state, networkID, currentAddress)
  const flatten = flattenTransactionsByOwner(transactionsList)

  const pending = selectPendingTransactionsByOwner(state, networkID, currentAddress)
  const flattenPending = flattenPendingTransactionsByOwner(pending)

  return [...flatten, ...flattenPending]
}
