// @flow strict

import { flattenTransactionsByOwner } from '.'

export function getTxById(
  itemsByOwner: TransactionsByOwner,
  id: TransactionId,
): ?TransactionWithPrimaryKeys {
  const items: TransactionWithPrimaryKeys[] = flattenTransactionsByOwner(itemsByOwner)

  return items.find((item: TransactionWithPrimaryKeys) => (item.keys.id === id))
}
