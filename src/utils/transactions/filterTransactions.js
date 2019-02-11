// @flow

function checkPending({ blockHash }: TransactionWithPrimaryKeys): boolean {
  return !blockHash
}

function filterTransactions(
  items: TransactionWithPrimaryKeys[],
  isOnlyPending: boolean,
): TransactionWithPrimaryKeys[] {
  if (!isOnlyPending) {
    return items
  }

  return items.filter((item: TransactionWithPrimaryKeys): boolean => checkPending(item))
}

export default filterTransactions
