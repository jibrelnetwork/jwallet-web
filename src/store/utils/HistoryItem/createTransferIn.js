// @flow strict

import { get } from 'lodash-es'

import { selectDigitalAssetOrThrow } from 'store/selectors/digitalAssets'

import { getTransactionStatus } from './utils/getTransactionStatus'
import { getTransactionNote } from './utils/getTransactionNote'
import { getTransactionFee } from './utils/getTransactionFee'
import { getTransactionTimestamp } from './utils/getTransactionTimestamp'

import {
  TRANSFER_IN_TYPE,
  type TransferIn,
} from './types'

export function createTransferIn(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
): TransferIn {
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
    type: TRANSFER_IN_TYPE,
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
