// @flow

function sortTransactions(
  items: TransactionWithPrimaryKeys[],
  direction: SortDirection = 'desc',
): TransactionWithPrimaryKeys[] {
  // eslint-disable-next-line fp/no-mutating-methods
  return [...items].sort((
    first: TransactionWithPrimaryKeys,
    second: TransactionWithPrimaryKeys,
  ): number => {
    const firstValue: number = first.blockData ? first.blockData.timestamp : 0
    const secondValue: number = second.blockData ? second.blockData.timestamp : 0

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
