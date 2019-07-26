// @flow strict

import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'

import { selectAllAddressNames } from 'store/selectors/favorites'

import {
  removeDuplicates,
  sortTransactions,
  filterTransactions,
  searchTransactions,
  flattenTransactionsByOwner,
  flattenPendingTransactionsByOwner,
} from 'utils/transactions'

import {
  selectCurrentBlock,
  selectProcessingBlock,
} from 'store/selectors/blocks'

import {
  selectTransactions,
  selectTransactionsByOwner,
  selectPendingTransactionsByOwner,
} from 'store/selectors/transactions'

import {
  type Props,
  HistoryView,
} from './HistoryView'

function prepareTransactions(
  items: TransactionWithPrimaryKeys[],
  pending: TransactionWithPrimaryKeys[],
  names: AddressNames,
  searchQuery: string,
  isPendingFiltered: boolean,
): TransactionWithPrimaryKeys[] {
  const merged: TransactionWithPrimaryKeys[] = [...items, ...pending]
  const cleaned: TransactionWithPrimaryKeys[] = removeDuplicates(merged)
  const filtered: TransactionWithPrimaryKeys[] = filterTransactions(cleaned, isPendingFiltered)
  const found: TransactionWithPrimaryKeys[] = searchTransactions(filtered, searchQuery, names)
  const sorted: TransactionWithPrimaryKeys[] = sortTransactions(found)

  return sorted
}

function mapStateToProps(state: AppState) {
  const currentBlock: ?BlockData = selectCurrentBlock(state)
  const addressNames: AddressNames = selectAllAddressNames(state)
  const processingBlock: ?BlockData = selectProcessingBlock(state)

  const {
    searchQuery,
    // isErrorFiltered,
    // isStuckFiltered,
    isPendingFiltered,
  }: TransactionsState = selectTransactions(state)

  const items: ?TransactionsByOwner = selectTransactionsByOwner(state)
  const flatten: TransactionWithPrimaryKeys[] = flattenTransactionsByOwner(items)
  const pending: ?PendingTransactionsByOwner = selectPendingTransactionsByOwner(state)
  const flattenPending: TransactionWithPrimaryKeys[] = flattenPendingTransactionsByOwner(pending)

  const isCurrentBlockEmpty: boolean = !currentBlock
  const isProcessing: boolean = !!(processingBlock && processingBlock.isTransactionsLoading)

  return {
    items: isCurrentBlockEmpty
      ? []
      : prepareTransactions(
        flatten,
        flattenPending,
        addressNames,
        searchQuery,
        isPendingFiltered,
      ),
    currentBlock: currentBlock && currentBlock.number,
    isLoading: isCurrentBlockEmpty || isProcessing,
  }
}

export const History = compose(
  withI18n(),
  connect<Props, OwnPropsEmpty, _, _, _, _>(mapStateToProps),
)(HistoryView)
