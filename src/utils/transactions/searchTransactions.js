// @flow

function checkField(field: string, searchQuery: string): boolean {
  return (field.toLocaleLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
}

function checkFound(item: TransactionWithAssetAddress, searchQuery: string): boolean {
  const { hash }: TransactionWithAssetAddress = item

  return checkField(hash, searchQuery)
}

function searchTransactions(
  items: TransactionWithAssetAddress[],
  searchQuery: string,
): TransactionWithAssetAddress[] {
  if (!searchQuery) {
    return items
  }

  return items.filter((item: TransactionWithAssetAddress): boolean => checkFound(
    item,
    searchQuery,
  ))
}

export default searchTransactions
