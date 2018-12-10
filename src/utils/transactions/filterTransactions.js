// @flow

function checkPending({ blockHash }: TransactionWithAssetAddress): boolean {
  return !blockHash
}

function filterTransactions(
  items: TransactionWithAssetAddress[],
  isOnlyPending: boolean,
): TransactionWithAssetAddress[] {
  if (!isOnlyPending) {
    return items
  }

  return items.filter((item: TransactionWithAssetAddress): boolean => checkPending(item))
}

export default filterTransactions
