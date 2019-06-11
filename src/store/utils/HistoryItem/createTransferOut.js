// @flow strict

import { get } from 'lodash-es'

import { selectDigitalAssetOrThrow } from 'store/selectors/digitalAssets'

import { getTransactionStatus } from './utils/getTransactionStatus'
import { getTransactionNote } from './utils/getTransactionNote'
import { getTransactionFee } from './utils/getTransactionFee'
import { getTransactionTimestamp } from './utils/getTransactionTimestamp'

import {
  TRANSFER_OUT_TYPE,
  type TransferOut,
} from './types'

export function createTransferOut(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
): TransferOut {
  const {
    id,
    assetAddress: asset,
  } = transaction.keys
  const status = getTransactionStatus(transaction)
  const note = getTransactionNote(state, transaction)
  const fee = getTransactionFee(transaction, selectDigitalAssetOrThrow(state, asset))
  const from: Address = get(transaction, 'from', '')
  const to: Address = get(transaction, 'to', '')
  const timestamp = getTransactionTimestamp(transaction)
  const {
    amount,
    hash,
  } = transaction

  return {
    type: TRANSFER_OUT_TYPE,
    id,
    hash,
    asset,
    status,
    from,
    to,
    fee,
    timestamp,
    note,
    amount,
  }
}
