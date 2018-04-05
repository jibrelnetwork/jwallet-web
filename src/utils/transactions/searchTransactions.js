/* @flow */

const searchTransactions = ({
  items,
  foundTransactions,
  searchQuery,
}: TransactionsData): Transactions => {
  if (!searchQuery) {
    return items
  }

  return items.filter(({ transactionHash }: Transaction): boolean => {
    return foundTransactions.includes(transactionHash)
  })
}

export default searchTransactions
