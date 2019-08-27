// @flow strict

import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'

import {
  flattenTransactionsByAsset,
  flattenTransactionsByOwner,
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
  networkIdOptional?: NetworkId,
): ?TransactionsByNetworkId {
  const networkId: NetworkId = networkIdOptional || selectCurrentNetworkId(state)
  const transactionsItems: TransactionsItems = selectTransactionsItems(state)

  return transactionsItems[networkId]
}

export function selectTransactionsByOwner(
  state: AppState,
  ownerOptional?: ?OwnerAddress,
): ?TransactionsByOwner {
  const owner: ?OwnerAddress = ownerOptional || selectActiveWalletAddress(state)

  if (!owner) {
    return null
  }

  const byNetworkId: ?TransactionsByNetworkId = selectTransactionsByNetworkId(state)

  if (!byNetworkId) {
    return null
  }

  return byNetworkId[owner]
}

export function selectTransactionsByAsset(
  state: AppState,
  asset: AssetAddress,
): ?TransactionsByAssetAddress {
  const byOwner: ?TransactionsByOwner = selectTransactionsByOwner(state)

  if (!byOwner) {
    return null
  }

  return byOwner[asset]
}

export function selectTransactionsByBlockNumber(
  state: AppState,
  asset: AssetAddress,
  blockNumber: BlockNumber,
): ?TransactionsByBlockNumber {
  const byAssetAddress: ?TransactionsByAssetAddress = selectTransactionsByAsset(
    state,
    asset,
  )

  if (!byAssetAddress) {
    return null
  }

  return byAssetAddress[blockNumber]
}

function selectTransactionByIdAndAssetAndBlockNumber(
  state: AppState,
  id: TransactionId,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
): ?TransactionWithPrimaryKeys {
  // search within specific range of blocks
  const byBlockNumber: ?TransactionsByBlockNumber = selectTransactionsByBlockNumber(
    state,
    assetAddress,
    blockNumber,
  )

  if (!(byBlockNumber && byBlockNumber.items)) {
    return null
  }

  const found: ?Transaction = byBlockNumber.items[id]

  if (found) {
    return {
      ...found,
      keys: {
        id,
        assetAddress,
        blockNumber,
      },
    }
  }

  return null
}

function selectTransactionByIdAndAsset(
  state: AppState,
  id: TransactionId,
  assetAddress: AssetAddress,
): ?TransactionWithPrimaryKeys {
  // search transaction by id within full list by asset address
  const byAssetAddress: ?TransactionsByAssetAddress = selectTransactionsByAsset(
    state,
    assetAddress,
  )

  if (!byAssetAddress) {
    return null
  }

  return Object.keys(byAssetAddress).reduce((
    result: ?TransactionWithPrimaryKeys,
    toBlock: BlockNumber,
  ): ?TransactionWithPrimaryKeys => {
    if (result) {
      return result
    }

    return selectTransactionByIdAndAssetAndBlockNumber(
      state,
      id,
      assetAddress,
      toBlock,
    )
  }, null)
}

export function selectTransactionById(
  state: AppState,
  id: TransactionId,
  assetAddress?: AssetAddress,
  blockNumber?: BlockNumber,
): ?TransactionWithPrimaryKeys {
  if (assetAddress && blockNumber) {
    return selectTransactionByIdAndAssetAndBlockNumber(
      state,
      id,
      assetAddress,
      blockNumber,
    )
  }

  if (assetAddress) {
    return selectTransactionByIdAndAsset(
      state,
      id,
      assetAddress,
    )
  }

  // search transaction by id within full list by owner address
  const byOwner: ?TransactionsByOwner = selectTransactionsByOwner(state)

  if (!byOwner) {
    return null
  }

  return Object.keys(byOwner).reduce((
    result: ?TransactionWithPrimaryKeys,
    asset: AssetAddress,
  ): ?TransactionWithPrimaryKeys => {
    if (result) {
      return result
    }

    return selectTransactionByIdAndAsset(
      state,
      id,
      asset,
    )
  }, null)
}

export function selectPendingTransactionsByNetworkId(
  state: AppState,
  networkIdOptional?: NetworkId,
): ?PendingTransactionsByNetworkId {
  const networkId: NetworkId = networkIdOptional || selectCurrentNetworkId(state)
  const transactionsPending: PendingTransactionsItems = selectPendingTransactionsItems(state)

  return transactionsPending[networkId]
}

export function selectPendingTransactionsByOwner(
  state: AppState,
  ownerOptional?: ?OwnerAddress,
): ?PendingTransactionsByOwner {
  const owner: ?OwnerAddress = ownerOptional || selectActiveWalletAddress(state)

  if (!owner) {
    return null
  }

  const byNetworkId: ?PendingTransactionsByNetworkId = selectPendingTransactionsByNetworkId(state)

  if (!byNetworkId) {
    return null
  }

  return byNetworkId[owner]
}

export function selectPendingTransactionsByAsset(
  state: AppState,
  asset: AssetAddress,
): ?Transactions {
  const byOwner: ?PendingTransactionsByOwner = selectPendingTransactionsByOwner(state)

  if (!byOwner) {
    return null
  }

  return byOwner[asset]
}

function selectPendingTransactionByHashAndAsset(
  state: AppState,
  txHash: Hash,
  assetAddress: AssetAddress,
): ?TransactionWithPrimaryKeys {
  const byAsset: ?Transactions = selectPendingTransactionsByAsset(
    state,
    assetAddress,
  )

  if (!byAsset) {
    return null
  }

  const found: ?Transaction = byAsset[txHash]

  if (found) {
    return {
      ...found,
      keys: {
        assetAddress,
        id: txHash,
        blockNumber: '-1',
      },
    }
  }

  return null
}

export function selectPendingTransactionByHash(
  state: AppState,
  txHash: Hash,
  assetAddress?: AssetAddress,
): ?TransactionWithPrimaryKeys {
  if (assetAddress) {
    return selectPendingTransactionByHashAndAsset(
      state,
      txHash,
      assetAddress,
    )
  }

  const byOwner: ?PendingTransactionsByOwner = selectPendingTransactionsByOwner(state)

  if (!byOwner) {
    return null
  }

  return Object.keys(byOwner).reduce((
    result: ?TransactionWithPrimaryKeys,
    asset: AssetAddress,
  ): ?TransactionWithPrimaryKeys => {
    if (result) {
      return result
    }

    return selectPendingTransactionByHashAndAsset(
      state,
      txHash,
      asset,
    )
  }, null)
}

export function selectTransactionByHash(
  state: AppState,
  hash: Hash,
  assetAddress?: AssetAddress,
): ?TransactionWithPrimaryKeys {
  if (assetAddress) {
    const itemsByAsset: ?TransactionsByAssetAddress = selectTransactionsByAsset(
      state,
      assetAddress,
    )

    const items: TransactionWithPrimaryKeys[] = flattenTransactionsByAsset(
      itemsByAsset,
      assetAddress,
    )

    return items.find((item: TransactionWithPrimaryKeys): boolean => (item.hash === hash))
  }

  const itemsByOwner: ?TransactionsByOwner = selectTransactionsByOwner(state)
  const items: TransactionWithPrimaryKeys[] = flattenTransactionsByOwner(itemsByOwner)

  return items.find((item: TransactionWithPrimaryKeys): boolean => (item.hash === hash))
}
