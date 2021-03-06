// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { checkStuck } from 'utils/transactions'
import { HistoryItemDetails } from 'components'
import { selectCommentsItems } from 'store/selectors/comments'
import { selectTransactions } from 'store/selectors/transactions'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'

import {
  JIcon,
  JLoader,
} from 'components/base'

import styles from './historyList.m.scss'
import { Item } from './components/Item/Item'
import { Empty } from './components/Empty/Empty'

type HistoryListHandler = (e: SyntheticUIEvent<HTMLDivElement>) => any

type OwnProps = {|
  +onListScroll?: ?HistoryListHandler,
  +onAsideScroll?: ?HistoryListHandler,
  +items: TransactionWithNoteAndNames[],
  +currentBlock: number,
  +isLoading: boolean,
  +isFiltered: boolean,
  +withFixedHeight?: boolean,
  +withDetailsPanel?: boolean,
|}

type Props = {|
  ...OwnProps,
  +notes: Comments,
  +digitalAssets: DigitalAssets,
  +ownerAddress: OwnerAddress,
|}

type StateProps = {|
  +activeItemKeys: ?TransactionPrimaryKeys,
|}

class HistoryList extends Component<Props, StateProps> {
  static defaultProps = {
    onListScroll: undefined,
    onAsideScroll: undefined,
    isLoading: false,
    isFiltered: false,
    withFixedHeight: false,
    withDetailsPanel: false,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      activeItemKeys: null,
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: StateProps) {
    const {
      items,
      notes,
      currentBlock,
      isLoading,
      withDetailsPanel,
    }: Props = this.props

    if (
      notes !== nextProps.notes ||
      isLoading !== nextProps.isLoading ||
      items.length !== nextProps.items.length ||
      currentBlock !== nextProps.currentBlock ||
      withDetailsPanel !== nextProps.withDetailsPanel
    ) {
      return true
    }

    const { activeItemKeys }: StateProps = this.state

    if (activeItemKeys !== nextState.activeItemKeys) {
      return true
    }

    return false
  }

  handleSetActive = (activeItemKeys: TransactionPrimaryKeys) => {
    if (!this.props.withDetailsPanel) {
      return undefined
    }

    return () => this.setState({ activeItemKeys })
  }

  handleClearActive = () => {
    this.setState({ activeItemKeys: null })
  }

  checkActive = (keys: TransactionPrimaryKeys): boolean => {
    const { activeItemKeys }: StateProps = this.state

    if (!activeItemKeys) {
      return false
    }

    return (
      keys.id === activeItemKeys.id &&
      keys.blockNumber === activeItemKeys.blockNumber &&
      keys.assetAddress === activeItemKeys.assetAddress
    )
  }

  render() {
    const {
      onListScroll: handleListScroll,
      onAsideScroll: handleAsideScroll,
      items,
      digitalAssets,
      ownerAddress,
      isLoading,
      isFiltered,
      withFixedHeight,
      withDetailsPanel,
    }: Props = this.props

    if (!(isLoading || items.length)) {
      return (
        <div className={`${styles.core} ${styles.empty}`}>
          <Empty isFiltered={isFiltered} />
        </div>
      )
    }

    const { activeItemKeys }: StateProps = this.state

    return (
      <div
        className={classNames(
          styles.core,
          isLoading && styles.loading,
          activeItemKeys && styles.active,
          withFixedHeight && styles.height,
        )}
      >
        <div
          onScroll={handleListScroll || undefined}
          className={styles.main}
        >
          <ul className={styles.list}>
            {items.map(({
              data,
              blockData,
              receiptData,
              keys,
              to,
              from,
              note,
              amount,
              toName,
              fromName,
              blockHash,
              eventType,
              contractAddress,
              isRemoved,
            }: TransactionWithNoteAndNames) => {
              const {
                id,
                assetAddress,
              }: TransactionPrimaryKeys = keys

              const isPending: boolean = !blockHash
              const isContractCreation: boolean = !!contractAddress
              const isSent: boolean = !!from && (ownerAddress.toLowerCase() === from.toLowerCase())
              const digitalAsset: ?DigitalAsset = digitalAssets[assetAddress]

              const assetDecimals: number = digitalAsset && digitalAsset.blockchainParams
                ? digitalAsset.blockchainParams.decimals
                : 18

              if (!(data && blockData && receiptData)) {
                return null
              }

              return (
                <li key={id}>
                  <Item
                    onClick={this.handleSetActive(keys)}
                    id={id}
                    to={to}
                    from={from}
                    note={note}
                    amount={amount}
                    toName={toName}
                    fromName={fromName}
                    eventType={eventType}
                    assetAddress={assetAddress}
                    assetSymbol={digitalAsset && digitalAsset.symbol}
                    contractAddress={contractAddress}
                    assetDecimals={assetDecimals}
                    isPending={isPending}
                    hasInput={data.hasInput}
                    isActive={this.checkActive(keys)}
                    isSent={isSent || isContractCreation}
                    isFailed={!receiptData.status || isRemoved}
                    isStuck={isPending && checkStuck(blockData.timestamp)}
                  />
                </li>
              )
            })}
          </ul>
          {isLoading && (
            <div className={styles.loader}>
              <JLoader color='gray' />
            </div>
          )}
        </div>
        {withDetailsPanel && (
          <div
            onScroll={handleAsideScroll || undefined}
            className={styles.right}
          >
            <div className={styles.sidebar}>
              <div className={styles.details}>
                {activeItemKeys && (
                  <HistoryItemDetails
                    id={activeItemKeys.id}
                    asset={activeItemKeys.assetAddress}
                    blockNumber={activeItemKeys.blockNumber}
                  />
                )}
                <button
                  onClick={this.handleClearActive}
                  className={styles.close}
                  type='button'
                >
                  <JIcon name='ic_close_24-use-fill' />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps(state: AppState) {
  const notes: Comments = selectCommentsItems(state)
  const ownerAddress: OwnerAddress = selectActiveWalletAddress(state)
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)

  const {
    searchQuery,
    isErrorFiltered,
    isPendingFiltered,
  }: TransactionsState = selectTransactions(state)

  return {
    notes,
    digitalAssets,
    ownerAddress,
    isFiltered: !!searchQuery || isErrorFiltered || isPendingFiltered,
  }
}

const HistoryListEnhanced = connect<Props, OwnProps, _, _, _, _>(mapStateToProps)(HistoryList)
export { HistoryListEnhanced as HistoryList }
