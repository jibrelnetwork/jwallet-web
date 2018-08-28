// @flow

function searchTransactions({
  items,
  foundTransactions,
  searchQuery,
}: TransactionsData): Transactions {
  if (!searchQuery) {
    return items
  }

  return items.filter(({
    transactionHash,
  }: Transaction): boolean => foundTransactions.includes(transactionHash))
}

export default searchTransactions
