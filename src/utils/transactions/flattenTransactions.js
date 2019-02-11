// @flow

import checkTransactionLoading from './checkTransactionLoading'

function flattenTransactions(
  items: Transactions,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
  isLoadingIncluded?: boolean = false,
): TransactionWithPrimaryKeys[] {
  return Object.keys(items).reduce((result: TransactionWithPrimaryKeys[], txId: TransactionId) => {
    const transaction: ?Transaction = items[txId]

    if (!transaction) {
      return result
    }

    const isLoading: boolean = checkTransactionLoading(transaction)

    if (isLoading && !isLoadingIncluded) {
      return result
    }

    return [
      ...result,
      {
        ...transaction,
        keys: {
          id: txId,
          blockNumber,
          assetAddress,
        },
      },
    ]
  }, [])
}

export default flattenTransactions
