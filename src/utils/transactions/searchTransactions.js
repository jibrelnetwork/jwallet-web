// @flow

import escapeRegExp from 'utils/regexp/escapeRegExp'

type TransactionWithNames = {
  ...TransactionWithPrimaryKeys,
  +toName: ?string,
  +fromName: ?string,
}

const HEX_PREFIX: string = '0x'

function searchBy(f: Function, query: string): Function {
  return (value: ?string): boolean => value ? f(value, query) : false
}

function checkHashes(field: string, searchQuery: string): boolean {
  const query: string = searchQuery.replace(`/^${HEX_PREFIX}/`, '')
  const fromEnd: RegExp = new RegExp(`${escapeRegExp(query)}$`, 'ig')
  const fromStart: RegExp = new RegExp(`^${HEX_PREFIX}${escapeRegExp(query)}`, 'ig')

  return fromStart.test(field) || fromEnd.test(field)
}

function checkNames(field: string, searchQuery: string): boolean {
  const pattern: RegExp = new RegExp(escapeRegExp(searchQuery), 'ig')

  return pattern.test(field)
}

function checkFound(item: TransactionWithNames, searchQuery: string): boolean {
  const {
    to,
    from,
    hash,
    toName,
    fromName,
  }: TransactionWithNames = item

  const searchableHashes = [hash, to, from]
  const searchableString = [toName, fromName]

  return searchableHashes.some(searchBy(checkHashes, searchQuery))
    || searchableString.some(searchBy(checkNames, searchQuery))
}

function searchTransactions(
  items: TransactionWithPrimaryKeys[],
  searchQuery: string,
  addressNames?: AddressNames,
): TransactionWithPrimaryKeys[] {
  if (!searchQuery || (searchQuery.trim() === HEX_PREFIX)) {
    return items
  }

  const itemsWithNames: TransactionWithNames[] = items.map(
    (transaction) => {
      const toName = transaction.to && addressNames ? addressNames[transaction.to] : null
      const fromName = transaction.from && addressNames ? addressNames[transaction.from] : null

      return {
        ...transaction,
        toName,
        fromName,
      }
    },
  )

  return itemsWithNames.reduce(
    (acc, item, index) => checkFound(item, searchQuery) ? [...acc, items[index]] : acc, [],
  )
}

export default searchTransactions
