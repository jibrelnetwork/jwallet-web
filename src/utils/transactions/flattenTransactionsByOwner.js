// @flow

import flattenTransactionsByAsset from './flattenTransactionsByAsset'

function flattenTransactionsByOwner(
  items: ?TransactionsByOwner,
  isLoadingIncluded?: boolean = false,
): TransactionWithPrimaryKeys[] {
  if (!items) {
    return []
  }

  return Object.keys(items).reduce((
    result: TransactionWithPrimaryKeys[],
    assetAddress: AssetAddress,
  ) => {
    const itemsByAsset: ?TransactionsByAssetAddress = items ? items[assetAddress] : null

    if (!itemsByAsset) {
      return result
    }

    const flattenedByAsset: TransactionWithPrimaryKeys[] = flattenTransactionsByAsset(
      itemsByAsset,
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
