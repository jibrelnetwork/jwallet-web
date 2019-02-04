// @flow

type TransactionWithNames = {
  ...TransactionWithPrimaryKeys,
  +toName: ?string,
  +fromName: ?string,
}

function searchBy(f: Function, query: string): Function {
  return (value: ?string): boolean => value ? f(value, query) : false
}

function checkHashes(field: string, searchQuery: string): boolean {
  const query = searchQuery.replace(/^0x/, '')
  const fromStart = new RegExp(`^0x${query}`, 'ig')
  const fromEnd = new RegExp(`${query}$`, 'ig')

  return fromStart.test(field) || fromEnd.test(field)
}

function checkNames(field: string, searchQuery: string) {
  const pattern = new RegExp(searchQuery, 'ig')
  return pattern.test(field)
}

function checkFound(
  item: TransactionWithNames,
  searchQuery: string,
): boolean {
  const { hash, to, from, toName, fromName }: TransactionWithNames = item
  const searchableHashes = [hash, to, from]
  const searchableString = [toName, fromName]

  // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
  return searchableHashes.some(searchBy(checkHashes, searchQuery))
  // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    || searchableString.some(searchBy(checkNames, searchQuery))
}

function searchTransactions(
  items: TransactionWithPrimaryKeys[],
  searchQuery: string,
  addressNames?: AddressNames,
): TransactionWithPrimaryKeys[] {
  if (!searchQuery) {
    return items
  }

  const itemsWithNames: TransactionWithNames[] = items.map(
    (transaction) => {
      const toName = transaction.to && addressNames ? addressNames[transaction.to] : null
      const fromName = transaction.from && addressNames ? addressNames[transaction.from] : null

      return { ...transaction, toName, fromName }
    }
  )

  return itemsWithNames.reduce(
    (acc, item, index) => checkFound(item, searchQuery) ? [...acc, items[index]] : acc, []
  )
}

export default searchTransactions
