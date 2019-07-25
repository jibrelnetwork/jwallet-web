// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { HistoryItemDetails } from 'components'
import { selectCommentsItems } from 'store/selectors/comments'
import { selectAllAddressNames } from 'store/selectors/favorites'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'
import { selectActiveWalletAddressOrThrow } from 'store/selectors/wallets'

import {
  getNote,
  checkStuck,
} from 'utils/transactions'

import {
  JIcon,
  JLoader,
} from 'components/base'

import styles from './historyList.m.scss'
import { Item } from './components/Item/Item'
import { Empty } from './components/Empty/Empty'

type HistoryListHandler = (e: Event) => any

type OwnProps = {|
  +onListScroll: ?HistoryListHandler,
  +onAsideScroll: ?HistoryListHandler,
  +items: TransactionWithPrimaryKeys[],
  +currentBlock: number,
  +isLoading: boolean,
|}

type Props = {|
  ...OwnProps,
  +notes: Comments,
  +addressNames: AddressNames,
  +digitalAssets: DigitalAssets,
  +ownerAddress: OwnerAddress,
|}

type StateProps = {|
  +activeItemKeys: ?TransactionPrimaryKeys,
|}

class HistoryList extends Component<Props, StateProps> {
  static defaultProps = {
    isLoading: false,
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

  handleSetActive = (activeItemKeys: TransactionPrimaryKeys) => () => {
    this.setState({ activeItemKeys })
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
      notes,
      addressNames,
      digitalAssets,
      ownerAddress,
      isLoading,
    }: Props = this.props

    if (!(isLoading || items.length)) {
      return (
        <div className={`${styles.transactionsList} ${styles.empty}`}>
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
              hash,
              amount,
              blockHash,
              eventType,
              contractAddress,
              isRemoved,
            }: TransactionWithPrimaryKeys) => {
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
                    amount={amount}
                    eventType={eventType}
                    assetAddress={assetAddress}
                    toName={to && addressNames[to]}
                    assetSymbol={digitalAsset.symbol}
                    contractAddress={contractAddress}
                    fromName={from && addressNames[from]}
                    assetDecimals={digitalAsset.blockchainParams.decimals}
                    note={getNote(
                      notes,
                      id,
                      hash,
                    )}
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
      </div>
    )
  }
}

function mapStateToProps(state: AppState) {
  const notes: Comments = selectCommentsItems(state)
  const addressNames: AddressNames = selectAllAddressNames(state)
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)
  const ownerAddress: OwnerAddress = selectActiveWalletAddressOrThrow(state)

  return {
    notes,
    addressNames,
    digitalAssets,
    ownerAddress,
  }
}

const HistoryListEnhanced = connect<Props, OwnProps, _, _, _, _>(mapStateToProps)(HistoryList)
export { HistoryListEnhanced as HistoryList }
