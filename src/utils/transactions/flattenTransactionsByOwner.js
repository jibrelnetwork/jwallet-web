// @flow

import flattenTransactionsByAsset from './flattenTransactionsByAsset'

function flattenTransactionsByOwner(
  items: TransactionsByOwner,
  isLoadingIncluded?: boolean = false,
): TransactionWithPrimaryKeys[] {
  return Object.keys(items).reduce((
    result: TransactionWithPrimaryKeys[],
    assetAddress: AssetAddress,
  ) => {
    const transactionsByAsset: ?TransactionsByAssetAddress = items[assetAddress]

    if (!transactionsByAsset) {
      return result
    }

    const flattenedByAsset: TransactionWithPrimaryKeys[] = flattenTransactionsByAsset(
      transactionsByAsset,
      assetAddress,
      isLoadingIncluded,
    )

    return [
      ...result,
      ...flattenedByAsset,
    ]
  }, [])
}

export default flattenTransactionsByOwner
