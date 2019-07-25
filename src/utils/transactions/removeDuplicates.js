// @flow strict

function checkFound(one: TransactionWithPrimaryKeys, two: TransactionWithPrimaryKeys) {
  if (one.keys.id === two.keys.id) {
    return true
  }

  // if one or two is ETH transaction
  if ((one.eventType === 0) || (two.eventType === 0)) {
    return (one.hash === two.hash)
  }

  return false
}

export function removeDuplicates(
  items: TransactionWithPrimaryKeys[],
): TransactionWithPrimaryKeys[] {
  return items.reduce((result: TransactionWithPrimaryKeys[], item: TransactionWithPrimaryKeys) => {
    const isFound: boolean = !!result.find((i: TransactionWithPrimaryKeys) => checkFound(i, item))

    return isFound ? result : [
      ...result,
      item,
    ]
  }, [])
}
