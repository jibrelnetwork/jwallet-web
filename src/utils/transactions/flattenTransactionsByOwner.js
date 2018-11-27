// @flow

import flattenTransactionsByAsset from './flattenTransactionsByAsset'

function flattenTransactionsByOwner(items: TransactionsByOwner): TransactionWithAssetAddress[] {
  return Object.keys(items).reduce((result: TransactionWithAssetAddress[], asset: AssetAddress) => {
    const transactionsByAsset: ?Transactions = items[asset]

    if (!transactionsByAsset) {
      return result
    }

    const flattenedByAsset: TransactionWithAssetAddress[] = flattenTransactionsByAsset(
      transactionsByAsset,
      asset,
    )

    return [
      ...result,
      ...flattenedByAsset,
    ]
  }, [])
}

export default flattenTransactionsByOwner
