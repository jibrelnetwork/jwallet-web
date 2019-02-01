// @flow

type ExtendedTransactionWithPrimaryKeys = {
  ...TransactionWithPrimaryKeys,
  +toName: ?string,
  +fromName: ?string,
}

function checkField(field: string, searchQuery: string): boolean {
  const sanitizedValue = field.replace(/^0x/, '')
  const fromStart = new RegExp(`^${searchQuery}`, 'ig')
  const fromEnd = new RegExp(`${searchQuery}$`, 'ig')
  return fromStart.test(sanitizedValue) || fromEnd.test(sanitizedValue)
}

function checkFound(
  item: ExtendedTransactionWithPrimaryKeys,
  searchQuery: string,
): boolean {
  const { hash, to, from, toName, fromName }: ExtendedTransactionWithPrimaryKeys = item
  const valuesForCheck = [hash, to, from, toName, fromName]

  return valuesForCheck.some(value => value && checkField(value, searchQuery))
}

function searchTransactions(
  items: TransactionWithPrimaryKeys[],
  searchQuery: string,
  favorites?: AddressNames,
): TransactionWithPrimaryKeys[] {
  if (!searchQuery) {
    return items
  }

  const itemsWithNames: ExtendedTransactionWithPrimaryKeys[] = items.map(
    (transaction) => {
      const toName = transaction.to && favorites ? favorites[transaction.to] : null
      const fromName = transaction.from && favorites ? favorites[transaction.from] : null

      return { ...transaction, toName, fromName }
    }
  )

  return itemsWithNames.reduce(
    (acc, item, index) => checkFound(item, searchQuery) ? [...acc, items[index]] : acc, []
  )
}

export default searchTransactions
