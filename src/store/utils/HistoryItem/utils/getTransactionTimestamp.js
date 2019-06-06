// @flow strict

import { get } from 'lodash-es'

export function getTransactionTimestamp(transaction: TransactionWithPrimaryKeys): number {
  return (get(transaction, 'blockData.timestamp', 0)) * 1000
}
