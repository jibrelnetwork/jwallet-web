// @flow

function sortTransactions(
  items: TransactionWithAssetAddress[],
  direction: SortDirection = 'desc',
): TransactionWithAssetAddress[] {
  // eslint-disable-next-line fp/no-mutating-methods
  return [...items].sort((
    first: TransactionWithAssetAddress,
    second: TransactionWithAssetAddress,
  ): number => {
    const firstValue: number = first.blockData ? first.blockData.minedAt : 0
    const secondValue: number = second.blockData ? second.blockData.minedAt : 0

    if (firstValue > secondValue) {
      return (direction === 'asc') ? 1 : -1
    } else if (firstValue < secondValue) {
      return (direction === 'asc') ? -1 : 1
    } else {
      return 0
    }
  })
}

export default sortTransactions
