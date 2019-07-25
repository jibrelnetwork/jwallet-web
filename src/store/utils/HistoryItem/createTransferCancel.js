// @flow strict

import { get } from 'lodash-es'

import { getTransactionStatus } from './utils/getTransactionStatus'
import { getTransactionNote } from './utils/getTransactionNote'
import { getTransactionFee } from './utils/getTransactionFee'
import { getTransactionTimestamp } from './utils/getTransactionTimestamp'

import {
  TRANSFER_CANCEL_TYPE,
  type TransferCancel,
} from './types'

export function createTransferCancel(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
): TransferCancel {
  const {
    id,
    assetAddress: asset,
  } = transaction.keys
  const fee = getTransactionFee(transaction)
  const status = getTransactionStatus(transaction)
  const note = getTransactionNote(state, transaction)
  const from: Address = get(transaction, 'from', '')
  const to: Address = get(transaction, 'to', '')
  const timestamp = getTransactionTimestamp(transaction)
  const { hash } = transaction

  return {
    type: TRANSFER_CANCEL_TYPE,
    id,
    hash,
    asset,
    status,
    from,
    to,
    fee,
    timestamp,
    note,
  }
}