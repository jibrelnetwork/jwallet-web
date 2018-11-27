// @flow

function checkPending(hash: Hash): boolean {
  return !hash
}

function filterTransactions(
  items: TransactionWithAssetAddress[],
  isOnlyPending: boolean,
): TransactionWithAssetAddress[] {
  if (!isOnlyPending) {
    return items
  }

  return items.filter((item: TransactionWithAssetAddress): boolean => checkPending(item.hash))
}

export default filterTransactions
