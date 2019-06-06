// @flow strict

import { get } from 'lodash-es'

import { type TransactionState } from 'store/utils/HistoryItem/types'

type StatusItem = {|
  +status: TransactionState,
  +criterion: (TransactionWithPrimaryKeys) => boolean,
|}

const HALF_HOUR = 1800000

// Warning: The order of elements is matter. Each subsequent element has a higher priority.
const STATUS_VALIDATORS: StatusItem[] = [
  {
    status: 'fail',
    criterion: tx =>
      tx.isRemoved || get(tx, 'receiptData.status', 'null') === '0',
  },
  {
    status: 'success',
    criterion: tx => get(tx, 'receiptData.status', 'null') === '1',
  },
  {
    status: 'pending',
    criterion: tx => tx.blockHash === null,
  },
  {
    status: 'stuck',
    criterion: (tx) => {
      const timestampDiff = (
        +new Date() - (tx.blockData ? tx.blockData.timestamp : +new Date())
      )
      const isPending = tx.blockHash === null

      return isPending && (timestampDiff > HALF_HOUR)
    },
  },
]

export function getTransactionStatus(
  transaction: TransactionWithPrimaryKeys,
): TransactionState {
  return STATUS_VALIDATORS.reduce((currentStatus, {
    status,
    criterion,
  }) => criterion(transaction) ? status : currentStatus, 'fail')
}
