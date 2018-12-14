// @flow

function checkField(field: string, searchQuery: string): boolean {
  return (field.toLocaleLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
}

function checkFound(item: TransactionWithPrimaryKeys, searchQuery: string): boolean {
  const { hash }: TransactionWithPrimaryKeys = item

  return checkField(hash, searchQuery)
}

function searchTransactions(
  items: TransactionWithPrimaryKeys[],
  searchQuery: string,
): TransactionWithPrimaryKeys[] {
  if (!searchQuery) {
    return items
  }

  return items.filter((item: TransactionWithPrimaryKeys): boolean => checkFound(
    item,
    searchQuery,
  ))
}

export default searchTransactions
