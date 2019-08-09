// @flow strict

import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'

import { changeSearchInput } from 'store/modules/transactions'
import { selectCommentsItems } from 'store/selectors/comments'
import { selectAllAddressNames } from 'store/selectors/favorites'

import {
  prepareListForRendering,
  flattenTransactionsByAsset,
  flattenPendingTransactions,
} from 'utils/transactions'

import {
  selectCurrentBlock,
  selectProcessingBlock,
} from 'store/selectors/blocks'

import {
  selectTransactions,
  selectTransactionsByAsset,
  selectPendingTransactionsByAsset,
} from 'store/selectors/transactions'

import {
  type Props,
  AssetsItemView,
} from './AssetsItemView'

type OwnProps = {|
  +assetId: string,
|}

function mapStateToProps(state: AppState, { assetId }: OwnProps) {
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

  const pending: ?Transactions = selectPendingTransactionsByAsset(state, assetId)
  const items: ?TransactionsByAssetAddress = selectTransactionsByAsset(state, assetId)
  const flatten: TransactionWithPrimaryKeys[] = flattenTransactionsByAsset(items, assetId)
  const flattenPending: TransactionWithPrimaryKeys[] = flattenPendingTransactions(pending, assetId)

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

export const AssetsItem = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(AssetsItemView)
