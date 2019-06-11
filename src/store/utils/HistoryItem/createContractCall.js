// @flow strict

import { get } from 'lodash-es'

import { selectDigitalAssetOrThrow } from 'store/selectors/digitalAssets'

import { getTransactionStatus } from './utils/getTransactionStatus'
import { getTransactionNote } from './utils/getTransactionNote'
import { getTransactionFee } from './utils/getTransactionFee'
import { getTransactionTimestamp } from './utils/getTransactionTimestamp'

import {
  CONTRACT_CALL_TYPE,
  type ContractCall,
} from './types'

export function createContractCall(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
): ContractCall {
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
  const contractAddress = get(transaction, 'contractAddress', '')
  const { hash } = transaction

  return {
    type: CONTRACT_CALL_TYPE,
    id,
    hash,
    asset,
    status,
    from,
    to,
    fee,
    timestamp,
    note,
    contractAddress,
  }
}
