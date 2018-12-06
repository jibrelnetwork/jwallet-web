// @flow

import checkTransactionLoading from './checkTransactionLoading'

function checkTransactionsFetched(items: Transactions): boolean {
  const loadingTransactions: Transactions = Object.keys(items).filter((hash: Hash): boolean => {
    const transaction: ?Transaction = items[hash]

    if (!transaction) {
      return false
    }

    const {
      data,
      blockData,
      receiptData,
    }: Transaction = transaction

    return checkTransactionLoading(data, blockData, receiptData)
  }).reduce

  return !!loadingTransactions.length
}

export default checkTransactionsFetched
