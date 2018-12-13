// @flow

import checkTransactionLoading from './checkTransactionLoading'

function flattenTransactions(
  items: Transactions,
  assetAddress: AssetAddress,
  isLoadingIncluded: boolean = false,
): TransactionWithAssetAddress[] {
  return Object.keys(items).reduce((result: TransactionWithAssetAddress[], txId: TransactionId) => {
    const transaction: ?Transaction = items[txId]

    if (!transaction) {
      return result
    }

    const isFound: boolean = !!result.find(({ id }: TransactionWithAssetAddress) => (txId === id))

    if (isFound) {
      return result
    }

    const {
      data,
      blockData,
      receiptData,
    }: Transaction = transaction

    const isLoading: boolean = checkTransactionLoading(data, blockData, receiptData)

    if (isLoading && !isLoadingIncluded) {
      return result
    }

    return [
      ...result,
      {
        id: txId,
        assetAddress,
        ...transaction,
      },
    ]
  }, [])
}

export default flattenTransactions
