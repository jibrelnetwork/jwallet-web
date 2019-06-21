// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import {
  JLoader,
  JIcon,
} from 'components/base'
import {
  TransactionItem,
  HistoryItemDetails,
} from 'components'

import { type TransactionItem as TransactionRecord } from 'store/transactionsIndex'

import TransactionsListEmpty from './Empty'

import style from './transactionsList.m.scss'

type Props = {|
  +items: TransactionRecord[],
  +isLoading: boolean,
|}

type State = {
  activeItem: ?string,
}

class TransactionsList extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      activeItem: null,
    }
  }

  sidebar = React.createRef()

  rootWrapper = window.root || document.getElementById('root')

  componentDidMount() {
    this.rootWrapper.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault()

    if (this.sidebar) {
      const { scrollTop } = this.rootWrapper
      const { current } = this.sidebar

      if (current) {
        setTimeout(() => {
          // eslint-disable-next-line fp/no-mutation
          current.style = current.offsetTop >= 112
            ? `top: ${scrollTop + 16}px`
            : 'top: 112px'
        }, 10)
      }
    }
  }

  handleSetActive = (id: TransactionId) => {
    this.setState({ activeItem: id })
  }

  handleClearActive = () => {
    this.setState({ activeItem: null })
  }

  componentWillUnmount() {
    this.rootWrapper.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const {
      items,
      isLoading,
    }: Props = this.props

    if (!(isLoading || items.length)) {
      return (
        <div className={`${style.transactionsList} ${style.empty}`}>
          <TransactionsListEmpty isFiltered={false} />
        </div>
      )
    }

    const { activeItem } = this.state

    return (
      <div className={classNames(style.core, activeItem && style.isActive)}>
        <ul className={style.transactionsList}>
          {items.map(({ id }: TransactionRecord) => (
            <li key={id}>
              <TransactionItem
                offset='mb16'
                txAddress={id}
                onClick={this.handleSetActive}
              />
            </li>
          ))}
          {isLoading && (
            <div className={style.loader}>
              <JLoader color='gray' />
            </div>
          )}
        </ul>
        {activeItem && (
          <div className={style.sidebar} ref={this.sidebar}>
            <div className={style.details}>
              <HistoryItemDetails txHash={activeItem} />
            </div>
            <button
              type='button'
              className={style.closeSidebar}
              onClick={this.handleClearActive}
            >
              <JIcon
                name='ic_close_24-use-fill'
              />
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default TransactionsList
