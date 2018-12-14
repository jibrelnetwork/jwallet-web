// @flow

import flattenTransactions from './flattenTransactions'

function flattenTransactionsByAsset(
  transactionsByAssetAddress: TransactionsByAssetAddress,
  assetAddress: AssetAddress,
  isLoadingIncluded?: boolean = false,
): TransactionWithPrimaryKeys[] {
  return Object.keys(transactionsByAssetAddress).reduce((
    result: TransactionWithPrimaryKeys[],
    blockNumber: BlockNumber,
  ) => {
    const transactionsByBlockNumber: ?TransactionsByBlockNumber =
      transactionsByAssetAddress[blockNumber]

    if (!transactionsByBlockNumber) {
      return result
    }

    const {
      items,
      isError,
    }: TransactionsByBlockNumber = transactionsByBlockNumber

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
