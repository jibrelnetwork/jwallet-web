// @flow

import filterLoadingTransactions from './filterLoadingTransactions'

function checkTransactionsByAssetLoading(
  itemsByAssetAddress: ?TransactionsByAssetAddress,
): boolean {
  if (!itemsByAssetAddress) {
    return true
  }

  return Object.keys(itemsByAssetAddress).reduce((
    resultByBlockNumber: boolean,
    blockNumber: BlockNumber,
  ): boolean => {
    // return true if already true
    if (resultByBlockNumber) {
      return true
    }

    const itemsByBlockNumber: ?TransactionsByBlockNumber = itemsByAssetAddress
      ? itemsByAssetAddress[blockNumber]
      : null

    // return true if items was not found by existed key
    if (!itemsByBlockNumber) {
      return true
    }

    const { items }: TransactionsByBlockNumber = itemsByBlockNumber

    // return true if items don't exist
    if (!items) {
      return true
    }

    const itemsFiltered: Transactions = filterLoadingTransactions(items, true)

    return (Object.keys(itemsFiltered).length !== 0)
  }, false)
}

export default checkTransactionsByAssetLoading
