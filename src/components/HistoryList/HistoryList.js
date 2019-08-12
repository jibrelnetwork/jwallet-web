// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { checkStuck } from 'utils/transactions'
import { HistoryItemDetails } from 'components'
import { selectCommentsItems } from 'store/selectors/comments'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'
import { selectActiveWalletAddressOrThrow } from 'store/selectors/wallets'

import {
  JIcon,
  JLoader,
} from 'components/base'

import styles from './historyList.m.scss'
import { Item } from './components/Item/Item'
import { Empty } from './components/Empty/Empty'

type HistoryListHandler = (e: SyntheticUIEvent<HTMLDivElement>) => any

type OwnProps = {|
  +onListScroll: ?HistoryListHandler,
  +onAsideScroll: ?HistoryListHandler,
  +items: TransactionWithNoteAndNames[],
  +currentBlock: number,
  +isLoading: boolean,
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
    isLoading: false,
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
    }: Props = this.props

    if (
      notes !== nextProps.notes ||
      isLoading !== nextProps.isLoading ||
      items.length !== nextProps.items.length ||
      currentBlock !== nextProps.currentBlock
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
      withDetailsPanel,
    }: Props = this.props

    if (!(isLoading || items.length)) {
      return (
        <div className={styles.list}>
          <Empty isFiltered={false} />
        </div>
      )
    }

    const { activeItemKeys }: StateProps = this.state

    return (
      <div
        className={classNames(
          styles.core,
          activeItemKeys && styles.active,
          withDetailsPanel && styles.details,
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

              if (!(digitalAsset && data && blockData && receiptData)) {
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
                    assetSymbol={digitalAsset.symbol}
                    contractAddress={contractAddress}
                    assetDecimals={digitalAsset.blockchainParams.decimals}
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
            {isLoading && (
              <div className={styles.loader}>
                <JLoader color='gray' />
              </div>
            )}
          </ul>
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
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)
  const ownerAddress: OwnerAddress = selectActiveWalletAddressOrThrow(state)

  return {
    notes,
    digitalAssets,
    ownerAddress,
  }
}

const HistoryListEnhanced = connect<Props, OwnProps, _, _, _, _>(mapStateToProps)(HistoryList)
export { HistoryListEnhanced as HistoryList }
