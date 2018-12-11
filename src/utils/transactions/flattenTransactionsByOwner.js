// @flow

import flattenTransactionsByAsset from './flattenTransactionsByAsset'

function flattenTransactionsByOwner(items: TransactionsByOwner): TransactionWithAssetAddress[] {
  return Object.keys(items).reduce((
    result: TransactionWithAssetAddress[],
    assetAddress: AssetAddress,
  ) => {
    const transactionsByAsset: ?TransactionsByAssetAddress = items[assetAddress]

    if (!transactionsByAsset) {
      return result
    }

    const flattenedByAsset: TransactionWithAssetAddress[] = flattenTransactionsByAsset(
      transactionsByAsset,
      assetAddress,
    )

    return [
      ...result,
      ...flattenedByAsset,
    ]
  }, [])
}

export default flattenTransactionsByOwner
