// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {
  memoize,
  noop,
} from 'lodash-es'

import {
  JAssetSymbol,
  JIcon,
  JLink,
} from 'components/base'
import { type Props as JIconProps } from 'components/base/JIcon/JIcon'
import formatAssetBalance from 'utils/formatters/formatAssetBalance'

import offsetsStyle from 'styles/offsets.m.scss'

import {
  type TransactionItem as TransactionItemRecord,
  type TransactionDirection,
  type TransactionStatus,
  transactionsIndex,
} from './transactionsIndex'

import transactionItemStyle from './transactionItem.m.scss'

const memoizedIndex = memoize(transactionsIndex)

export type ContainerProps = {
  +onClick?: (Address) => mixed,
  +txAddress: Address,
  +offset?: OffsetVariant,
  +isActive: boolean,
}

type Props = ContainerProps & {
  +transaction: TransactionItemRecord,
}

const transactionIconMap: { [string]: JIconProps } = {
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
  stucked: {
    name: 'circle-alert-use-fill',
    color: 'red',
  },
  lost: {
    name: 'circle-cross-use-fill',
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

function formatTransactionAmount({
  asset,
  amount,
  type,
  status,
}: TransactionItemRecord): string {
  const formatted = asset
    ? formatAssetBalance(asset.blockchainParams.address, amount, asset.blockchainParams.decimals)
    : amount
  const symboled = `${formatted}\u202F${asset.symbol}`

  return status === 'success'
    ? `${(type === 'in' ? '+' : '\u002D')}${symboled}`
    : symboled
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
      txAddress,
      transaction,
      isActive,
      offset,
    } = this.props

    // FIXME: Temporary solution, don't handle mint/burn events and other strange things
    if (transaction.asset && !transaction.asset.blockchainParams) {
      return null
    }

    return (
      <JLink
        className={classNames(
          '__transaction-item',
          transactionItemStyle.core,
          transaction.status === 'fail' && transactionItemStyle.error,
          isActive && transactionItemStyle.selected,
          offsetsStyle[offset],
        )}
        href={`/history/${transaction.asset.blockchainParams.address}/${txAddress}`}
        onClick={this.handleClick}
      >
        <div className={`${transactionItemStyle.item} ${transactionItemStyle.statusIcon}`}>
          <JIcon
            {...getTransactionIcon(transaction.type, transaction.status)}
          />
        </div>
        <div className={classNames(transactionItemStyle.item, transactionItemStyle.mainBlock)}>
          <div>{transaction.title}</div>
          {transaction.note
            && <div className={transactionItemStyle.subtext}>{transaction.note}</div>
          }
        </div>
        <div className={`${transactionItemStyle.item} ${transactionItemStyle.amountBlock}`}>
          {formatTransactionAmount(transaction)}
          {transaction.fiatAmount
            && <div className={transactionItemStyle.subtext}>{transaction.fiatAmount}</div>}
        </div>
        <div className={classNames(transactionItemStyle.item, transactionItemStyle.assetIcon)}>
          <JAssetSymbol symbol={transaction.asset.symbol} color='gray' />
        </div>
      </JLink>
    )
  }
}

function mapStateToProps(state: AppState, { txAddress }: ContainerProps) {
  return { transaction: memoizedIndex(state)[txAddress] }
}

const connectedComponent = (
  connect/* :: < AppState, ContainerProps, any, _, _ > */(mapStateToProps)(TransactionItem)
)

export {
  connectedComponent as TransactionItem,
  TransactionItem as PureTransactionItem,
}
