// @flow

import flattenPendingTransactions from './flattenPendingTransactions'

function flattenPendingTransactionsByOwner(
  items: ?PendingTransactionsByOwner,
): TransactionWithPrimaryKeys[] {
  if (!items) {
    return []
  }

  return Object.keys(items).reduce((
    result: TransactionWithPrimaryKeys[],
    assetAddress: AssetAddress,
  ): TransactionWithPrimaryKeys[] => {
    const itemsByAsset: ?Transactions = items ? items[assetAddress] : null

    return !itemsByAsset ? result : [
      ...result,
      ...flattenPendingTransactions(itemsByAsset, assetAddress),
    ]
  }, [])
}

export default flattenPendingTransactionsByOwner
