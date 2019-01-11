// @flow

import classNames from 'classnames'

import React, {
  Fragment,
  PureComponent,
} from 'react'

import config from 'config'
import handle from 'utils/eventHandlers/handle'
import getAddressLink from 'utils/transactions/getAddressLink'
import getFormattedDateString from 'utils/time/getFormattedDateString.js'

import {
  isZero,
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import {
  JIcon,
  JText,
  JAssetSymbol,
} from 'components/base'

type TransactionTextColor = 'red' | 'gray' | 'blue'
type TransactionIconColor = 'red' | 'gray' | 'white'
type TransactionIconName = 'time' | 'cross-circle' | 'transaction-send' | 'transaction-receive'

type Props = {|
  +setActive: (boolean) => void,
  +asset: DigitalAsset,
  +data: TransactionWithPrimaryKeys,
  +comment: ?string,
  +txAddress: ?Address,
  +txAddressName: ?string,
  +blockExplorerSubdomain: string,
  +isSent: boolean,
  +isActive: boolean,
  +isAssetList: boolean,
|}

function getTransactionTextColor(isSent: boolean, isFailed: boolean): TransactionTextColor {
  if (isFailed) {
    return 'red'
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
  isSent: boolean,
  isPending: boolean,
  isFailed: boolean,
): TransactionIconName {
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
      blockExplorerSubdomain,
      isSent,
      isActive,
      isAssetList,
    }: Props = this.props

    const {
      blockData,
      receiptData,
      hash,
      amount,
      blockHash,
      contractAddress,
      isRemoved,
    }: TransactionWithPrimaryKeys = data

    const {
      symbol,
      isCustom,
      blockchainParams: {
        decimals,
      },
    }: DigitalAsset = asset

    if (!(blockData && receiptData)) {
      return null
    }

    const isPending: boolean = !blockHash
    const amountSign: string = isSent ? '-' : '+'
    const timestamp: number = blockData.timestamp * 1000
    const isFailed: boolean = !receiptData.status || isRemoved
    const color: TransactionTextColor = getTransactionTextColor(isSent, isFailed)

    return (
      <div
        onClick={handle(setActive)(hash)}
        className={classNames('transaction-item-main', isActive && '-active')}
      >
        <div className='box'>
          <div className='status'>
            <JIcon
              size='medium'
              name={getTransactionIconName(isSent, isPending, isFailed)}
              color={getTransactionIconColor(isPending, isFailed, timestamp)}
            />
          </div>
          <div className='data'>
            {txAddress && (
              <div className='address'>
                {contractAddress && (
                  <div className='icon'>
                    <JIcon
                      size='small'
                      color='black'
                      name='contract'
                    />
                  </div>
                )}
                <a
                  href={getAddressLink(txAddress, blockExplorerSubdomain)}
                  target='_blank'
                  className='link'
                  rel='noopener noreferrer'
                >
                  <JText
                    color={color}
                    value={txAddressName || txAddress}
                    weight='bold'
                    size='normal'
                  />
                </a>
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
                <JIcon size='medium' name='message' color='gray' />
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
                  ${formatBalance(divDecimals(amount, decimals))}
                  ${symbol}
                `}
                color={color}
                size='normal'
                weight='bold'
                whiteSpace='wrap'
              />
            </div>
            {/* {!isZero(amount) && (
              <div className='fiat'>
                <JText value='20,000 USD' color='gray' size='small' whiteSpace='wrap' />
              </div>
            )} */}
          </div>
          {!isAssetList && (
            <Fragment>
              {!isCustom ? (
                <div className='symbol -icon'>
                  <JAssetSymbol symbol={symbol} color='gray' />
                </div>
              ) : (
                <div className='symbol -text'>
                  <JText
                    value={symbol}
                    color='blue'
                    weight='bold'
                    size='normal'
                    whiteSpace='wrap'
                  />
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default TransactionItemMain
