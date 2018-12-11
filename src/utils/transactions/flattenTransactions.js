// @flow

import checkTransactionLoading from './checkTransactionLoading'

function flattenTransactions(
  items: Transactions,
  assetAddress: AssetAddress,
): TransactionWithAssetAddress[] {
  return Object.keys(items).reduce((result: TransactionWithAssetAddress[], id: TransactionId) => {
    const transaction: ?Transaction = items[id]

    if (!transaction) {
      return result
    }

    const {
      data,
      blockData,
      receiptData,
    }: Transaction = transaction

    if (checkTransactionLoading(data, blockData, receiptData)) {
      return result
    }

    return [
      ...result,
      {
        id,
        assetAddress,
        ...transaction,
      },
    ]
  }, [])
}

export default flattenTransactions
