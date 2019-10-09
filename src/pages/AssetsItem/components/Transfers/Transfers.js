// @flow strict

import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

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
  TitleHeader,
  TransactionsFilter,
} from 'components'

type OwnProps = {|
  +onHeaderScroll: (isScrolled: boolean) => void,
  +assetId: string,
|}

type Props = {|
  ...OwnProps,
  +changeSearchInput: (value: string) => any,
  +items: TransactionWithNoteAndNames[],
  +i18n: I18n,
  +searchQuery: string,
  +currentBlock: number,
  +isLoading: boolean,
|}

type StateProps = {|
  +isListScrolled: boolean,
  +isAsideScrolled: boolean,
|}

const HEADER_OFFSET_TOP_DEFAULT: number = 336

class Transfers extends PureComponent<Props, StateProps> {
  containerRef = React.createRef<HTMLDivElement>()

  static defaultProps = {
    currentBlock: 0,
    isLoading: false,
  }

  handleChangeSearchInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.changeSearchInput(e.target.value)
  }

  getOffsetTop = (): number => {
    if (!(this.containerRef && this.containerRef.current)) {
      return HEADER_OFFSET_TOP_DEFAULT
    }

    return this.containerRef.current.offsetTop
  }

  render() {
    const {
      i18n,
      items,
      searchQuery,
      currentBlock,
      isLoading,
      onHeaderScroll: handleHeaderScroll,
    }: Props = this.props

    return (
      <div ref={this.containerRef}>
        <TitleHeader
          onScroll={handleHeaderScroll}
          title={i18n._(
            'AssetsItem.Transfers.title',
            null,
            { defaults: 'Transfers' },
          )}
          offsetTop={this.getOffsetTop()}
        >
          <SearchInput
            onChange={this.handleChangeSearchInput}
            value={searchQuery}
          >
            <TransactionsFilter />
          </SearchInput>
        </TitleHeader>
        <HistoryList
          items={items}
          currentBlock={currentBlock}
          isLoading={isLoading}
        />
      </div>
    )
  }
}

function mapStateToProps(state: AppState, { assetId }: OwnProps) {
  const notes: Comments = selectCommentsItems(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state)
  const processingBlock: ?BlockData = selectProcessingBlock(state)

  const addressNames: AddressNames = selectAllAddressNames(
    state,
    true,
  )

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
