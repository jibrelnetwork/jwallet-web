// @flow strict

import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'

import { changeSearchInput } from 'store/modules/transactions'
import { selectCommentsItems } from 'store/selectors/comments'
import { selectAllAddressNames } from 'store/selectors/favorites'

import {
  prepareListForRendering,
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

function mapStateToProps(state: AppState) {
  const notes: Comments = selectCommentsItems(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state)
  const addressNames: AddressNames = selectAllAddressNames(state)
  const processingBlock: ?BlockData = selectProcessingBlock(state)

  const {
    searchQuery,
    isErrorFiltered,
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
    searchQuery,
    items: isCurrentBlockEmpty ? [] : prepareListForRendering(
      [...flatten, ...flattenPending],
      notes,
      addressNames,
      searchQuery,
      {
        isErrorFiltered,
        isPendingFiltered,
      },
    ),
    currentBlock: currentBlock && currentBlock.number,
    isLoading: isCurrentBlockEmpty || isProcessing,
  }
}

const mapDispatchToProps = {
  changeSearchInput,
}

export const History = compose(
  withI18n(),
  connect<Props, OwnPropsEmpty, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(HistoryView)
