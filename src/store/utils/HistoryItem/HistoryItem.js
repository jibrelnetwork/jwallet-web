// @flow

import { memoize } from 'lodash-es'

import { selectTransactionsList } from 'store/selectors/transactions'
import { setHistoryItemType } from 'store/utils/HistoryItem/utils/setHistoryItemType'

import { createTransferIn } from './createTransferIn'
import { createTransferOut } from './createTransferOut'
import { createTransferCancel } from './createTransferCancel'
import { createContractCall } from './createContractCall'

import {
  TRANSFER_IN_TYPE,
  TRANSFER_OUT_TYPE,
  TRANSFER_CANCEL_TYPE,
  CONTRACT_CALL_TYPE,
  type HistoryItem,
  type HistoryItemsTypes,
} from './types'

type HistoryItemHandlerMap = {
  [HistoryItemsTypes]: (AppState, TransactionWithPrimaryKeys) => HistoryItem,
}

const ITEM_HANDLER_MAP: HistoryItemHandlerMap = {
  [TRANSFER_IN_TYPE]: createTransferIn,
  [TRANSFER_OUT_TYPE]: createTransferOut,
  [TRANSFER_CANCEL_TYPE]: createTransferCancel,
  [CONTRACT_CALL_TYPE]: createContractCall,
}

function prepareHistoryItem(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
): HistoryItem {
  const type = setHistoryItemType(state, transaction)

  if (!type) {
    throw new Error('Type of item is not defined')
  }

  return ITEM_HANDLER_MAP[type](state, transaction)
}

// FIXME: Temporary solution to store indexed values for transactions
export const MEMO = {
  transactionsIndex: {},
  transactions: '',
}

function getHistoryItemsIndex(state: AppState) {
  const transactions = selectTransactionsList(state)

  // Performance optimization
  // eslint-disable-next-line fp/no-mutation
  MEMO.transactionsIndex = transactions.reduce((reduceResult, transaction) => {
    reduceResult[transaction.keys.id] = prepareHistoryItem(state, transaction)

    return reduceResult
  }, {})

  return MEMO.transactionsIndex
}

export const transactionsIndex = memoize(getHistoryItemsIndex)
