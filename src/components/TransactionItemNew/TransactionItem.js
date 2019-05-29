// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {
  noop,
  get,
} from 'lodash-es'

import {
  JAssetSymbol,
  JIcon,
  JLink,
} from 'components/base'
import { formatTransactionAmount } from 'utils/formatters'
import { type JIconProps } from 'components/base/JIcon/JIcon'

import offsetsStyle from 'styles/offsets.m.scss'

import {
  type TransactionItem as TransactionItemRecord,
  type TransactionDirection,
  type TransactionStatus,
  transactionsIndex,
  MEMO,
} from 'store/transactionsIndex'

import transactionItemStyle from './transactionItem.m.scss'

export type ContainerProps = {|
  +onClick?: (TransactionId) => mixed,
  +txAddress: Address,
  +offset?: OffsetVariant,
  +isActive?: boolean,
|}

type Props = {|
  ...$Exact<ContainerProps>,
  +transaction: TransactionItemRecord,
|}

const transactionIconMap: { [TransactionStatus | TransactionDirection]: JIconProps } = {
  pending: {
    name: 'clock-use-fill',
    color: 'gray',
  },
  in: {
    name: 'transaction-in-use-fill',
    color: 'blue',
  },
  out: {
    name: 'transaction-out-use-fill',
    color: 'blue',
  },
  fail: {
    name: 'circle-cross-use-fill',
    color: 'red',
  },
  stuck: {
    name: 'circle-alert-use-fill',
    color: 'red',
  },
}

function getTransactionIcon(
  type: TransactionDirection,
  status: TransactionStatus,
): JIconProps {
  if (status === 'success') {
    return transactionIconMap[type]
  }

  return transactionIconMap[status]
}

class TransactionItem extends PureComponent<Props, *> {
  static defaultProps = {
    onClick: noop,
  }

  handleClick = (event: SyntheticEvent<HTMLAnchorElement>): void => {
    event.preventDefault()

    if (!this.props.isActive) {
      // $FlowFixMe
      this.props.onClick(this.props.transaction.id)
    }
  }

  render() {
    const {
      transaction,
      isActive,
      offset,
    } = this.props

    // FIXME: Temporary solution, don't handle mint/burn events and other strange things
    if (transaction === undefined || !transaction.asset) {
      return null
    }

    return (
      <JLink
        className={classNames(
          '__transaction-item',
          transactionItemStyle.core,
          transactionItemStyle[transaction.type],
          transactionItemStyle[transaction.status],
          isActive && transactionItemStyle.selected,
          offsetsStyle[offset],
        )}
        href={`/history/${transaction.id}`}
        onClick={this.handleClick}
      >
        <div className={`${transactionItemStyle.item} ${transactionItemStyle.statusIcon}`}>
          <JIcon
            {...getTransactionIcon(transaction.type, transaction.status)}
          />
        </div>
        <div className={classNames(transactionItemStyle.item, transactionItemStyle.mainBlock)}>
          <div
            title={transaction.title.length >= 50 ? transaction.title : undefined}
            className={transactionItemStyle.text}
          >
            {transaction.title}
          </div>
          {transaction.note && (
            <div
              title={transaction.note.length >= 60 ? transaction.note : undefined}
              className={transactionItemStyle.subtext}
            >
              {transaction.note}
            </div>
          )}
        </div>
        <div className={`${transactionItemStyle.item} ${transactionItemStyle.amountBlock}`}>
          {formatTransactionAmount(transaction)}
          {transaction.fiatAmount
            && <div className={transactionItemStyle.subtext}>{transaction.fiatAmount}</div>}
        </div>
        <JAssetSymbol
          symbol={transaction.asset.symbol}
          color='gray'
          address={get(transaction, 'asset.blockchainParams.address')}
          size={24}
          className={transactionItemStyle.assetIcon}
        />
      </JLink>
    )
  }
}

function mapStateToProps(state: AppState, { txAddress }: ContainerProps) {
  const dataMap = Object.keys(MEMO.transactionsIndex).length > 0
    ? MEMO.transactionsIndex
    : transactionsIndex(state)

  return { transaction: dataMap[txAddress] }
}

const connectedComponent = (
  connect<Props, ContainerProps, _, _, _, _>(mapStateToProps)(TransactionItem)
)

export {
  connectedComponent as TransactionItem,
  TransactionItem as PureTransactionItem,
}
