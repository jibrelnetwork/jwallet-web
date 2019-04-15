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
export type TransactionStatus = 'success' | 'pending' | 'fail' | 'stuck'
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

type StatusItem = {|
  +status: TransactionStatus,
  +criterion: (TransactionWithPrimaryKeys) => boolean,
|}

const HALF_HOUR = 1800000

// Warning: The order of elements is matter. Each subsequent element has a higher priority.
const STATUS_VALIDATORS: StatusItem[] = [
  {
    status: 'fail',
    criterion: tx => String(tx.receiptData.status) === '0',
  },
  {
    status: 'success',
    criterion: tx => String(tx.receiptData.status) === '1',
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
  return STATUS_VALIDATORS.reduce((currentStatus, {
    status,
    criterion,
  }) => criterion(transaction) ? status : currentStatus, 'fail')
}

function getTransactionName(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
  type: TransactionDirection,
): string {
  const favorites = selectFavorites(state)
  const addressNames = selectAddressNames(state)
  const primaryName = (type === 'in' ? transaction.from : transaction.to)
    || transaction.contractAddress
    || transaction.hash // I'm not sure

  return favorites[primaryName]
    || addressNames[primaryName]
    || primaryName
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

  return transactions.reduce((reduceResult, transaction) => {
    reduceResult[transaction.hash] = prepareTransactionItem(state, transaction)

    return reduceResult
  }, {})
}

