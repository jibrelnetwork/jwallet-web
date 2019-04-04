// @flow

import { selectTransactionsList } from 'store/selectors/transactions'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'
import {
  selectActiveWalletAddress,
  selectAddressNames,
} from 'store/selectors/wallets'
import { selectFavorites } from 'store/selectors/favorites'
import { selectCommentsItems } from 'store/selectors/comments'

export type TransactionDirection = 'in' | 'out'
export type TransactionStatus = 'success' | 'pending' | 'fail' | 'stucked'
export type TransactionItem = {|
  +id: TransactionId,
  +asset: ?DigitalAsset,
  +type: TransactionDirection,
  +status: TransactionStatus,
  +title: string,
  +note: ?string,
  +amount: string,
  +fiatAmount: string,
|}

function getTransactionType(
  state: AppState,
  { from }: TransactionWithPrimaryKeys,
): TransactionDirection {
  const ownerAddress = selectActiveWalletAddress(state) || ''

  return !!from && (ownerAddress.toLowerCase() === from.toLowerCase()) ? 'out' : 'in'
}

function getTransactionStatus(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
): TransactionStatus {
  const statusMap = {
    '0': 'fail',
    '1': 'success',
  }

  return transaction.receiptData ? statusMap[String(transaction.receiptData.status)] : 'fail'
}

function getTransactionName(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
  type: TransactionDirection,
): string {
  const favorites = selectFavorites(state)
  const addressNames = selectAddressNames(state)
  const primaryName = type === 'in' ? transaction.from : transaction.to

  return favorites[primaryName] || addressNames[primaryName] || primaryName
}

function getTransactionComment(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
): ?string {
  /**
   * comment by transaction id has greater priority than comment by transaction hash
   * this is actual only for contract events
   */
  const { id } = transaction.keys
  const { hash } = transaction
  const comments = selectCommentsItems(state)

  if (comments[id] != null) {
    return comments[id]
  }

  return comments[hash]
}

function prepareTransactionItem(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
): TransactionItem {
  const asset = selectDigitalAssetsItems(state)[transaction.keys.assetAddress]
  const type = getTransactionType(state, transaction)
  const status = getTransactionStatus(state, transaction)
  const title = getTransactionName(state, transaction, type)
  const note = getTransactionComment(state, transaction)
  const { amount } = transaction

  return {
    id: transaction.keys.id,
    asset,
    type,
    status,
    title,
    note,
    amount,
    // TODO: We can't get correct fiat amount yet, because we are have't exchange rate history
    fiatAmount: '',
  }
}

// FIXME: Temporary solution to store indexed values for transactions
export function transactionsIndex(state: AppState) {
  const transactions = selectTransactionsList(state)

  return transactions.reduce((prev, transaction) => ({
    ...prev,
    [transaction.hash]: prepareTransactionItem(state, transaction),
  }), {})
}

