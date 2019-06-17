// @flow

import {
  flattenTransactionsByOwner,
  flattenPendingTransactionsByOwner,
} from 'utils/transactions'

import { type HistoryState } from '../types'

import { selectCurrentNetworkId } from './network'
import { selectCurrentAddress } from './priorities'

export function selectTransactionsForCurrentNetwork(state: HistoryState) {
  const networkId = selectCurrentNetworkId(state)

  return state.transactions.items[networkId]
}

export function selectPendingTransactionsForCurrentNetwork(state: HistoryState) {
  const networkId = selectCurrentNetworkId(state)

  return state.transactions.pending[networkId]
}

export function selectTransactionsByOwner(
  state: HistoryState,
  owner: ?OwnerAddress,
): ?TransactionsByOwner {
  if (!owner) {
    return null
  }

  const byNetworkId: ?TransactionsByNetworkId = selectTransactionsForCurrentNetwork(state)

  if (!byNetworkId) {
    return null
  }

  return byNetworkId[owner]
}

export function selectTransactionsByAsset(
  state: HistoryState,
  owner: ?OwnerAddress,
  asset: AssetAddress,
): ?TransactionsByAssetAddress {
  const byOwner: ?TransactionsByOwner = selectTransactionsByOwner(state, owner)

  if (!byOwner) {
    return null
  }

  return byOwner[asset]
}

export function selectTransactionsByBlockNumber(
  state: HistoryState,
  owner: OwnerAddress,
  asset: AssetAddress,
  blockNumber: BlockNumber,
): ?TransactionsByBlockNumber {
  const byAssetAddress: ?TransactionsByAssetAddress = selectTransactionsByAsset(
    state,
    owner,
    asset,
  )

  if (!byAssetAddress) {
    return null
  }

  return byAssetAddress[blockNumber]
}

export function selectTransactionById(
  state: HistoryState,
  owner: OwnerAddress,
  asset: AssetAddress,
  id: TransactionId,
  blockNumber?: BlockNumber,
): ?Transaction {
  // search within specific range, if blockNumber was specified
  if (blockNumber) {
    const byBlockNumber: ?TransactionsByBlockNumber = selectTransactionsByBlockNumber(
      state,
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

export function selectPendingTransactionsByOwner(
  state: HistoryState,
  owner: ?OwnerAddress,
): ?PendingTransactionsByOwner {
  if (!owner) {
    return null
  }

  const byNetworkId: ?PendingTransactionsByNetworkId = selectPendingTransactionsForCurrentNetwork(
    state,
  )

  if (!byNetworkId) {
    return null
  }

  return byNetworkId[owner]
}

export function selectPendingTransactionsByAsset(
  state: HistoryState,
  owner: ?OwnerAddress,
  asset: AssetAddress,
): ?Transactions {
  const byOwner: ?PendingTransactionsByOwner = selectPendingTransactionsByOwner(
    state,
    owner,
  )

  if (!byOwner) {
    return null
  }

  return byOwner[asset]
}

export function selectPendingTransactionByHash(
  state: HistoryState,
  owner: OwnerAddress,
  asset: AssetAddress,
  txHash: Hash,
): ?Transaction {
  const byAsset: ?Transactions = selectPendingTransactionsByAsset(
    state,
    owner,
    asset,
  )

  if (!byAsset) {
    return null
  }

  return byAsset[txHash]
}

export function selectTransactionsList(state: HistoryState): TransactionWithPrimaryKeys[] {
  const address = selectCurrentAddress(state)

  if (!address) {
    return []
  }

  const transactionsList = selectTransactionsByOwner(state, address)
  const flatten = flattenTransactionsByOwner(transactionsList)

  const pending = selectPendingTransactionsByOwner(state, address)
  const flattenPending = flattenPendingTransactionsByOwner(pending)

  return [...flatten, ...flattenPending]
}
