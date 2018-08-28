// @flow

function filterFoundTransactions({
  items,
  foundTransactions,
  searchQuery,
}: TransactionsData): Transactions {
  if (!searchQuery) {
    return items
  }

  return items.filter((tx: Transaction): boolean => foundTransactions.includes(tx.transactionHash))
}

export default filterFoundTransactions
