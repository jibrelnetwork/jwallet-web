// @flow

import classNames from 'classnames'
import { t } from 'ttag'

import React, {
  PureComponent,
} from 'react'

import config from 'config'
import handle from 'utils/eventHandlers/handle'
import getFormattedDateString from 'utils/time/getFormattedDateString.js'

import { isZero } from 'utils/numbers'
import { formatAssetBalance } from 'utils/formatters'

import {
  JIcon,
  JText,
  JAssetSymbol,
} from 'components/base'

type TransactionTextColor = 'red' | 'gray' | 'blue'
type TransactionIconColor = 'red' | 'gray' | 'white'
type TransactionIconName =
  'mint-event' |
  'burn-event' |
  'time' |
  'cross-circle' |
  'transaction-send' |
  'transaction-receive'

type Props = {|
  +setActive: (boolean) => void,
  +asset: DigitalAsset,
  +data: TransactionWithPrimaryKeys,
  +comment: ?string,
  +txAddress: ?Address,
  +txAddressName: ?string,
  +isSent: boolean,
  +isActive: boolean,
  +isAssetList: boolean,
  +isEventMint: boolean,
  +isEventBurn: boolean,
|}

function getTransactionTextColor(
  isEventMint: boolean,
  isEventBurn: boolean,
  isSent: boolean,
  isFailed: boolean,
): TransactionTextColor {
  if (isFailed) {
    return 'red'
  }

  if (isEventMint) {
    return 'blue'
  }

  if (isEventBurn) {
    return 'gray'
  }

  return isSent ? 'gray' : 'blue'
}

function getTransactionIconColor(
  isPending: boolean,
  isFailed: boolean,
  timestamp: number,
): TransactionIconColor {
  const isDelayed: boolean = isPending && ((Date.now() - timestamp) > config.miningDelay)

  if (isDelayed || isFailed) {
    return 'red'
  }

  return isPending ? 'gray' : 'white'
}

function getTransactionIconName(
  isEventMint: boolean,
  isEventBurn: boolean,
  isSent: boolean,
  isPending: boolean,
  isFailed: boolean,
): TransactionIconName {
  if (isEventMint) {
    return 'mint-event'
  }

  if (isEventBurn) {
    return 'burn-event'
  }

  if (isPending) {
    return 'time'
  }

  if (isFailed) {
    return 'cross-circle'
  }

  return isSent ? 'transaction-send' : 'transaction-receive'
}

class TransactionItemMain extends PureComponent<Props> {
  render() {
    const {
      setActive,
      data,
      asset,
      comment,
      txAddress,
      txAddressName,
      isSent,
      isActive,
      isAssetList,
      isEventMint,
      isEventBurn,
    }: Props = this.props

    const {
      blockData,
      receiptData,
      hash,
      amount,
      blockHash,
      contractAddress,
      isRemoved,
      keys: {
        assetAddress,
      },
    }: TransactionWithPrimaryKeys = data

    const {
      symbol,
      blockchainParams: {
        decimals,
      },
      isCustom,
    }: DigitalAsset = asset

    if (!(blockData && receiptData)) {
      return null
    }

    const isPending: boolean = !blockHash
    const amountSign: string = isSent ? '-' : '+'
    const timestamp: number = blockData.timestamp * 1000
    const isFailed: boolean = !receiptData.status || isRemoved
    const color: TransactionTextColor =
      getTransactionTextColor(isEventMint, isEventBurn, isSent, isFailed)

    return (
      <div
        onClick={handle(setActive)(hash)}
        className={classNames(
          'transaction-item-main',
          {
            '-active': isActive,
            '-in-single-asset-list': isAssetList,
          },
        )}
      >
        <div className='box'>
          <div className='symbol'>
            <JAssetSymbol symbol={symbol} color='gray' isCustom={isCustom} />
          </div>
          <div className='data'>
            {txAddress ? (
              <div className='address'>
                {contractAddress && (
                  <div className='icon'>
                    <JIcon
                      color='black'
                      name='contract'
                    />
                  </div>
                )}
                <JText
                  color={color}
                  value={txAddressName || txAddress}
                  weight='bold'
                  size='normal'
                />
              </div>
            ) : (
              <div className='address'>
                {isEventMint && (
                  <JText
                    color={color}
                    value={t`Token minting`}
                    weight='bold'
                    size='normal'
                    whiteSpace='wrap'
                  />
                )}
                {isEventBurn && (
                  <JText
                    color={color}
                    value={t`Token burning`}
                    weight='bold'
                    size='normal'
                    whiteSpace='wrap'
                  />
                )}
              </div>
            )}
            <div className='time'>
              <JText
                value={getFormattedDateString(timestamp)}
                color='gray'
                size='small'
                whiteSpace='wrap'
              />
            </div>
          </div>
          {!!comment && (
            <div className='message'>
              <div className='icon'>
                <JIcon name='message' color='gray' />
              </div>
              <div className='text'>
                <JText value={comment} color='gray' size='normal' />
              </div>
            </div>
          )}
        </div>
        <div className='box'>
          <div className='balance'>
            <div className='crypto'>
              <JText
                value={`
                  ${isZero(amount) ? '' : amountSign}
                  ${assetAddress && formatAssetBalance(assetAddress, amount, decimals)}
                  ${symbol}
                `}
                color={color}
                size='normal'
                weight='bold'
                whiteSpace='wrap'
              />
            </div>
          </div>
          <div className='status'>
            <JIcon
              name={getTransactionIconName(isEventMint, isEventBurn, isSent, isPending, isFailed)}
              color={getTransactionIconColor(isPending, isFailed, timestamp)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TransactionItemMain
