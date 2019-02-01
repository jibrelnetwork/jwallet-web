// @flow

import config from 'config'

import {
  filterLoadingTransactions,
  getLastExistedBlockNumberByAsset,
} from '.'

const GENESIS_BLOCK_NUMBER: number = 0

function checkTransactionsByAssetLoading(
  itemsByAssetAddress: ?TransactionsByAssetAddress,
  minBlock: ?number,
): boolean {
  if (!itemsByAssetAddress) {
    return true
  }

  const blockNumbers: BlockNumber[] = Object.keys(itemsByAssetAddress)

  if (!blockNumbers.length) {
    return true
  }

  const minBlockNumber: number = minBlock || GENESIS_BLOCK_NUMBER
  const lastExistedBlockNumber: number = getLastExistedBlockNumberByAsset(itemsByAssetAddress)
  const diff: number = (lastExistedBlockNumber - minBlockNumber)

  // return true if there are no some necessary block number occurrences
  if (diff > config.maxBlocksPerTransactionsRequest) {
    return true
  }

  return blockNumbers.reduce((
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

    return !!Object.keys(itemsFiltered).length
  }, false)
}

export default checkTransactionsByAssetLoading
