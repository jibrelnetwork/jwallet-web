// @flow

function checkField(field: string, searchQuery: string): boolean {
  const query = searchQuery.replace(/^0x/, '')
  const fromStart = new RegExp(`^0x${query}`, 'ig')
  const fromEnd = new RegExp(`${query}$`, 'ig')
  return fromStart.test(field) || fromEnd.test(field)
}

function checkFound(item: TransactionWithPrimaryKeys, searchQuery: string): boolean {
  const { hash, to, from }: TransactionWithPrimaryKeys = item

  return [
    checkField(hash, searchQuery),
    from && checkField(from, searchQuery),
    to && checkField(to, searchQuery),
  ].filter(e => e).length > 0
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
