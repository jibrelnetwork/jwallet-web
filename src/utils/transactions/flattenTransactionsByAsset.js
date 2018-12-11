// @flow

import flattenTransactions from './flattenTransactions'

function flattenTransactionsByAsset(
  transactionsByAssetAddress: TransactionsByAssetAddress,
  assetAddress: AssetAddress,
): TransactionWithAssetAddress[] {
  return Object.keys(transactionsByAssetAddress).reduce((
    result: TransactionWithAssetAddress[],
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

    const flattened: TransactionWithAssetAddress[] = flattenTransactions(items, assetAddress)

    return [
      ...result,
      ...flattened,
    ]
  }, [])
}

export default flattenTransactionsByAsset
