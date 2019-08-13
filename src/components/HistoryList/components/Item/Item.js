// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import config from 'config'
import { formatAssetBalance } from 'utils/formatters'

import {
  divDecimals,
  toBigNumber,
} from 'utils/numbers'

import {
  JIcon,
  JLink,
  JAssetSymbol,
} from 'components/base'

import styles from './item.m.scss'

type ItemHandler = (transactionId: TransactionId) => any

export type OwnProps = {|
  +onClick: ?ItemHandler,
  +id: TransactionId,
  +isActive: boolean,
|}

type Props = {|
  ...OwnProps,
  +i18n: I18nType,
  +to: ?Address,
  +note: ?string,
  +from: ?Address,
  +amount: string,
  +toName: ?string,
  +fromName: ?string,
  +assetSymbol: ?string,
  +contractAddress: ?Address,
  +assetAddress: AssetAddress,
  +eventType: TransactionEventType,
  +assetDecimals: number,
  +isSent: boolean,
  +isStuck: boolean,
  +hasInput: boolean,
  +isFailed: boolean,
  +isPending: boolean,
|}

class Item extends PureComponent<Props> {
  static defaultProps = {
    isSent: false,
    isFailed: false,
    isActive: false,
    isPending: false,
  }

  handleClick = (e: SyntheticEvent<HTMLAnchorElement>) => {
    const {
      onClick,
      id,
      isActive,
    } = this.props

    if (!onClick || isActive) {
      return
    }

    e.preventDefault()
    onClick(id)
  }

  getIcon = (): ?string => {
    const {
      to,
      from,
      eventType,
      assetSymbol,
      isSent,
      isStuck,
      hasInput,
      isFailed,
      isPending,
    }: Props = this.props

    const isUnknownAsset: boolean = !assetSymbol
    const isMintable: boolean = (eventType === 2)
    const isEventBurn: boolean = (isMintable && !to)
    const isEventMint: boolean = (isMintable && !from)
    const isCancel: boolean = (to === config.cancelAddress)

    if (isFailed) {
      return 'error_declined'
    }

    if (isStuck) {
      // return 'error_stuck'
    }

    if (isPending) {
      return 'pending'
    }

    if (isEventBurn) {
      return 'out'
    }

    if (isEventMint) {
      return 'in'
    }

    if (hasInput || isCancel || isUnknownAsset) {
      return 'success'
    }

    return isSent ? 'out' : 'in'
  }

  getType = (): ?string => {
    const {
      to,
      from,
      eventType,
      isSent,
      hasInput,
      isFailed,
      isPending,
    }: Props = this.props

    const isMintable: boolean = (eventType === 2)
    const isEventBurn: boolean = (isMintable && !to)
    const isEventMint: boolean = (isMintable && !from)

    if (isFailed) {
      return 'error'
    }

    if (isPending) {
      return 'pending'
    }

    if (isSent || isEventBurn) {
      return 'out'
    }

    if (!isSent || isEventMint || hasInput) {
      return 'in'
    }

    return null
  }

  getTitle = (): ?string => {
    const {
      i18n,
      to,
      from,
      toName,
      fromName,
      eventType,
      contractAddress,
      isSent,
    }: Props = this.props

    const isMintable: boolean = (eventType === 2)
    const isEventBurn: boolean = (isMintable && !to)
    const isEventMint: boolean = (isMintable && !from)

    if (isEventBurn) {
      return i18n._(
        'HistoryList.Item.title.burn',
        null,
        { defaults: 'Token burning' },
      )
    }

    if (isEventMint) {
      return i18n._(
        'HistoryList.Item.title.mint',
        null,
        { defaults: 'Token minting' },
      )
    }

    const txAddressName: ?string = isSent ? toName : fromName
    const txAddress: ?string = isSent ? (to || contractAddress) : from

    return txAddressName || txAddress
  }

  getSign = (): string => {
    const {
      amount,
      isSent,
      isFailed,
    }: Props = this.props

    if (toBigNumber(amount).isZero() || isFailed) {
      return ''
    }

    return isSent ? '−' : '+'
  }

  getAmount = (): ?string => {
    const {
      amount,
      assetSymbol,
      assetAddress,
      assetDecimals,
    }: Props = this.props

    const isZero: boolean = toBigNumber(amount).isZero()

    return isZero ? null : formatAssetBalance(assetAddress, amount, assetDecimals, assetSymbol)
  }

  render() {
    const {
      id,
      note,
      amount,
      assetSymbol,
      assetAddress,
      assetDecimals,
      isActive,
    }: Props = this.props

    const icon: ?string = this.getIcon()
    const type: ?string = this.getType()
    const title: ?string = this.getTitle()
    const txAmount: ?string = this.getAmount()

    return (
      <JLink
        onClick={this.handleClick}
        href={`/history/${id}`}
        className={classNames(
          '__history-list-item',
          styles.core,
          type && styles[type],
          isActive && styles.active,
        )}
      >
        {icon && (
          <JIcon
            name={`ic_trx_${icon}_24-use-fill`}
            className={classNames(
              styles.icon,
              type && styles[type],
            )}
          />
        )}
        <div className={styles.info}>
          {title && (
            <div
              title={title}
              className={classNames(
                styles.title,
                type && styles[type],
              )}
            >
              {title}
            </div>
          )}
          {note && (
            <div
              title={note}
              className={styles.note}
            >
              {note}
            </div>
          )}
        </div>
        {txAmount && assetSymbol && (
          <>
            <div
              title={divDecimals(amount, assetDecimals)}
              className={classNames(
                styles.amount,
                type && styles[type],
              )}
            >
              {`${this.getSign()}\u00A0${txAmount}`}
            </div>
            <JAssetSymbol
              symbol={assetSymbol}
              address={assetAddress}
              className={styles.symbol}
              color='gray'
              size={24}
            />
          </>
        )}
      </JLink>
    )
  }
}

const ItemEnhanced = withI18n()(Item)
export { ItemEnhanced as Item }
