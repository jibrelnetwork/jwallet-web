// @flow

import checkTransactionLoading from './checkTransactionLoading'

function filterLoadingTransactions(items: Transactions, isLoading?: boolean = false): Transactions {
  return Object.keys(items).reduce((result: Transactions, id: TransactionId): Transactions => {
    const tx: ?Transaction = items[id]

    if (!tx) {
      return result
    }

    const {
      data,
      blockData,
      receiptData,
    }: Transaction = tx

    const isFetched: boolean = !checkTransactionLoading(data, blockData, receiptData)

    /**
     * required loading | is tx loaded | result (result true means omit current tx)
     * true             | true         | true
     * true             | false        | false
     * false            | true         | false
     * false            | false        | true
     */
    return (isLoading === isFetched) ? result : {
      ...result,
      [id]: tx,
    }
  }, {})
}

export default filterLoadingTransactions
