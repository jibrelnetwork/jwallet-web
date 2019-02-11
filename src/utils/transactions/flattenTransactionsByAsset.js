// @flow

import flattenTransactions from './flattenTransactions'

function flattenTransactionsByAsset(
  itemsByAssetAddress: ?TransactionsByAssetAddress,
  assetAddress: AssetAddress,
  isLoadingIncluded?: boolean = false,
): TransactionWithPrimaryKeys[] {
  if (!itemsByAssetAddress) {
    return []
  }

  return Object.keys(itemsByAssetAddress).reduce((
    result: TransactionWithPrimaryKeys[],
    blockNumber: BlockNumber,
  ) => {
    const itemsByBlockNumber: ?TransactionsByBlockNumber = itemsByAssetAddress
      ? itemsByAssetAddress[blockNumber]
      : null

    if (!itemsByBlockNumber) {
      return result
    }

    const {
      items,
      isError,
    }: TransactionsByBlockNumber = itemsByBlockNumber

    if (!items || isError) {
      return result
    }

    const flattened: TransactionWithPrimaryKeys[] = flattenTransactions(
      items,
      assetAddress,
      blockNumber,
      isLoadingIncluded,
    )

    return [
      ...result,
      ...flattened,
    ]
  }, [])
}

export default flattenTransactionsByAsset
