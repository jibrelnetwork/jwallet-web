// @flow strict

function checkPending({ blockHash }: TransactionWithPrimaryKeys): boolean {
  return !blockHash
}

function filterTransactions(
  items: TransactionWithPrimaryKeys[],
  isPendingFiltered: boolean,
): TransactionWithPrimaryKeys[] {
  if (!isPendingFiltered) {
    return items
  }

  return items.filter((item: TransactionWithPrimaryKeys): boolean => checkPending(item))
}

export default filterTransactions
