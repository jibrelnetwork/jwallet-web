// @flow

const GENESIS_BLOCK_NUMBER: number = 0

function getLastExistedBlockNumberByAsset(itemsByAssetAddress: TransactionsByAssetAddress): number {
  return Object.keys(itemsByAssetAddress).reduce((
    result: number,
    blockNumber: BlockNumber,
  ) => {
    const currentBlockNumber: number = parseInt(blockNumber, 10) || GENESIS_BLOCK_NUMBER

    // need to get the lowest block number
    const isLower: boolean = (currentBlockNumber < result)

    // result === GENESIS_BLOCK_NUMBER means initial result
    const isInitialResult: boolean = (result === GENESIS_BLOCK_NUMBER)

    // return result if current block number bigger than previous
    if (!(isLower || isInitialResult)) {
      return result
    }

    const itemsByBlockNumber: ?TransactionsByBlockNumber = itemsByAssetAddress[blockNumber]

    if (!itemsByBlockNumber) {
      return result
    }

    const {
      items,
      isError,
    }: TransactionsByBlockNumber = itemsByBlockNumber

    if (!isError && items) {
      return currentBlockNumber
    }

    return result
  }, GENESIS_BLOCK_NUMBER)
}

export default getLastExistedBlockNumberByAsset
