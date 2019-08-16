// @flow strict

import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { Header } from 'components/base'
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
  HistoryList,
  SearchInput,
  TransactionsFilter,
} from 'components'

type OwnProps = {|
  +assetId: string,
|}

type Props = {|
  ...OwnProps,
  +changeSearchInput: (value: string) => any,
  +items: TransactionWithNoteAndNames[],
  +i18n: I18nType,
  +searchQuery: string,
  +currentBlock: number,
  +isLoading: boolean,
|}

type StateProps = {|
  +isListScrolled: boolean,
  +isAsideScrolled: boolean,
|}

class Transfers extends PureComponent<Props, StateProps> {
  static defaultProps = {
    currentBlock: 0,
    isLoading: false,
  }

  handleChangeSearchInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.changeSearchInput(e.target.value)
  }

  render() {
    const {
      i18n,
      items,
      searchQuery,
      currentBlock,
      isLoading,
    }: Props = this.props

    return (
      <>
        <Header
          title={i18n._(
            'AssetsItem.Transfers.title',
            null,
            { defaults: 'Transfers' },
          )}
        >
          <SearchInput
            onChange={this.handleChangeSearchInput}
            value={searchQuery}
          >
            <TransactionsFilter />
          </SearchInput>
        </Header>
        <HistoryList
          items={items}
          currentBlock={currentBlock}
          isLoading={isLoading}
        />
      </>
    )
  }
}

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

const TransfersEnhanced = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Transfers)

export { TransfersEnhanced as Transfers }
