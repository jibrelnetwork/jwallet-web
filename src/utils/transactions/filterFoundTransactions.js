// @flow

function filterFoundTransactions(transactions: Transaction[], foundItems: Hashes): Transaction[] {
  return transactions.filter((item: Transaction): boolean => foundItems.includes(item.hash))
}

export default filterFoundTransactions
