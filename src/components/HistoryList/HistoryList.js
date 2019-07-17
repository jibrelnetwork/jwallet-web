// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import { type HistoryItem as HistoryItemType } from 'store/utils/HistoryItem/types'

import {
  JIcon,
  JLoader,
} from 'components/base'

import {
  TransactionItem,
  HistoryItemDetails,
} from 'components'

import styles from './historyList.m.scss'
import { Empty } from './components/Empty'

type HistoryListHandler = (e: Event) => any

type Props = {|
  +onListScroll: ?HistoryListHandler,
  +onAsideScroll: ?HistoryListHandler,
  +items: HistoryItemType[],
  +isLoading: boolean,
|}

type StateProps = {|
  +activeItem: ?string,
|}

export class HistoryList extends PureComponent<Props, StateProps> {
  rootElement: ?HTMLElement

  constructor(props: Props) {
    super(props)

    this.state = {
      activeItem: null,
    }
  }

  handleSetActive = (id: TransactionId) => {
    this.setState({ activeItem: id })
  }

  handleClearActive = () => {
    this.setState({ activeItem: null })
  }

  render() {
    const {
      items,
      isLoading,
      onListScroll: handleListScroll,
      onAsideScroll: handleAsideScroll,
    }: Props = this.props

    if (!(isLoading || items.length)) {
      return (
        <div className={`${styles.transactionsList} ${styles.empty}`}>
          <Empty isFiltered={false} />
        </div>
      )
    }

    const { activeItem }: StateProps = this.state

    return (
      <div
        className={classNames(
          styles.core,
          activeItem && styles.active,
        )}
      >
        <div
          onScroll={handleListScroll || undefined}
          className={styles.main}
        >
          <ul className={styles.list}>
            {items.map(({ id }: HistoryItemType) => (
              <li key={id}>
                <TransactionItem
                  offset='mb16'
                  txAddress={id}
                  onClick={this.handleSetActive}
                />
              </li>
            ))}
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
              {activeItem && <HistoryItemDetails txHash={activeItem} />}
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
