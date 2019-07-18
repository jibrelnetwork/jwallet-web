// @flow

import {
  get,
  memoize,
} from 'lodash-es'

import { selectTransactionsList } from 'store/selectors/transactions'
import { selectDigitalAssetOrThrow } from 'store/selectors/digitalAssets'
import {
  selectActiveWalletAddressOrThrow,
  selectAddressWalletsNames,
} from 'store/selectors/wallets'
import { selectFavorites } from 'store/selectors/favorites'
import { selectCommentsItems } from 'store/selectors/comments'
import { getTxFee } from 'utils/transactions'

export type TransactionDirection = 'in' | 'out' | 'cancel'
export type TransactionStatus = 'success' | 'pending' | 'fail' | 'stuck'
export type TransactionItem = {|
  +id: TransactionId,
  +hash: Hash,
  +asset: ?DigitalAsset, // FIXME: Don't use nested properties, use only used properties from object
  +type: TransactionDirection, // FIXME: direction?
  +status: TransactionStatus,
  +title: string,
  +from: OwnerAddress,
  +to: OwnerAddress,
  +fee: string,
  +timestamp: number,
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
    criterion: tx => String(get(tx, 'receiptData.status', null)) === '0',
  },
  {
    status: 'success',
    criterion: tx => String(get(tx, 'receiptData.status', null)) === '1',
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
  const ownerAddress = selectActiveWalletAddressOrThrow(state)

  return !!from && (ownerAddress.toLowerCase() === from.toLowerCase()) ? 'out' : 'in'
}

function getTransactionStatus(
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
  const addressNames = selectAddressWalletsNames(state)
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
  const comments = selectCommentsItems(state)

  if (comments[id] != null) {
    return comments[id]
  }

  return comments[id]
}

function getTransactionFee(
  transaction: TransactionWithPrimaryKeys,
  asset: DigitalAsset,
): string {
  const gasUsed = get(transaction, 'receiptData.gasUsed', 0)
  const gasPrice = get(transaction, 'data.gasPrice', 0)
  const decimals = get(asset, 'blockchainParams.decimals', 18)

  return getTxFee(gasUsed, gasPrice, decimals)
}

function prepareTransactionItem(
  state: AppState,
  transaction: TransactionWithPrimaryKeys,
): TransactionItem {
  const asset = selectDigitalAssetOrThrow(state, transaction.keys.assetAddress)
  const type = getTransactionType(state, transaction)
  const status = getTransactionStatus(transaction)
  const title = getTransactionName(state, transaction, type)
  const note = getTransactionComment(state, transaction)
  const fee = getTransactionFee(transaction, asset)
  const from = get(transaction, 'from', '')
  const to = get(transaction, 'to', '')
  const timestamp = (get(transaction, 'blockData.timestamp', 0)) * 1000
  const {
    amount,
    hash,
  } = transaction

  return {
    id: transaction.keys.id,
    hash,
    asset,
    type,
    status,
    title,
    from,
    to,
    fee,
    timestamp,
    note,
    amount,
    // TODO: We can't get correct fiat amount yet, because we are have't exchange rate history
    fiatAmount: '',
  }
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
    reduceResult[transaction.keys.id] = prepareTransactionItem(state, transaction)

    return reduceResult
  }, {})

  return MEMO.transactionsIndex
}

export const transactionsIndex = memoize(getHistoryItemsIndex)
