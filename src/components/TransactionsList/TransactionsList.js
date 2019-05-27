// @flow

import React, { Component } from 'react'

import {
  JLoader,
  JIcon,
} from 'components/base'
import {
  TransactionItem,
  HistoryItemDetails,
} from 'components'

import TransactionsListEmpty from './Empty'

import style from './transactionsList.m.scss'

type Props = {|
  +items: TransactionWithPrimaryKeys[],
  +isLoading: boolean,
  +isFiltered: boolean,
|}

type State = {
  activeItem: ?string,
}

class TransactionsList extends Component<Props, State> {
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
      isFiltered,
    }: Props = this.props

    if (!(isLoading || items.length)) {
      return (
        <div className={`${style.transactionsList} ${style.empty}`}>
          <TransactionsListEmpty isFiltered={isFiltered} />
        </div>
      )
    }

    const { activeItem } = this.state

    return (
      <div className={style.core}>
        <ul className={style.transactionsList}>
          {items.map((item: TransactionWithPrimaryKeys) => {
            const {
              keys,
              hash,
            }: TransactionWithPrimaryKeys = item

            return (
              <li
                key={keys.id}
              >
                <TransactionItem
                  offset='mb16'
                  txAddress={hash}
                  onClick={this.handleSetActive}
                />
              </li>
            )
          })}
          {isLoading && (
            <div className={style.loader}>
              <JLoader color='gray' />
            </div>
          )}
        </ul>
        {activeItem && (
          <div className={style.sidebar}>
            <HistoryItemDetails txHash={activeItem} />
            <button
              type='button'
              className={style.closeSidebar}
              onClick={this.handleClearActive}
            >
              <JIcon name='cross' color='white' />
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default TransactionsList
