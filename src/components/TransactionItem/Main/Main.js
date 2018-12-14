// @flow

import classNames from 'classnames'

import React, {
  Fragment,
  PureComponent,
} from 'react'

import handle from 'utils/eventHandlers/handle'
import getAddressLink from 'utils/transactions/getAddressLink'
import getFormattedDateString from 'utils/time/getFormattedDateString.js'

import {
  isZero,
  divDecimals,
} from 'utils/numbers'

import {
  JIcon,
  JText,
  JAssetSymbol,
} from 'components/base'

type Props = {|
  +setActive: (boolean) => void,
  +data: TransactionWithPrimaryKeys,
  +assetSymbol: string,
  +blockExplorerSubdomain: string,
  +assetDecimals: number,
  +isSent: boolean,
  +isActive: boolean,
  +isCustom: boolean,
  +isAssetList: boolean,
|}

class TransactionItemMain extends PureComponent<Props> {
  static defaultProps = {
    isSent: false,
    isActive: false,
    isCustom: false,
    isAssetList: false,
  }

  render() {
    const {
      setActive,
      data,
      assetSymbol,
      blockExplorerSubdomain,
      assetDecimals,
      isSent,
      isActive,
      isCustom,
      isAssetList,
    } = this.props

    const {
      blockData,
      to,
      from,
      hash,
      amount,
      contractAddress,
    }: TransactionWithPrimaryKeys = data

    if (!blockData) {
      return null
    }

    const color = isSent ? 'gray' : 'blue'
    const toAddress: ?OwnerAddress = to || contractAddress
    const txAddress: ?OwnerAddress = isSent ? toAddress : from
    const iconName: string = isSent ? 'transaction-send' : 'transaction-receive'
    const amountSign: string = isSent ? '-' : '+'

    return (
      <div
        onClick={handle(setActive)(hash)}
        className={classNames('transaction-item-main', isActive && '-active')}
      >
        <div className='box'>
          <div className='status'>
            <JIcon size='medium' name={iconName} />
          </div>
          <div className='data'>
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
                  value={txAddress || ''}
                  weight='bold'
                  size='normal'
                />
              </a>
            </div>
            <div className='time'>
              <JText
                value={getFormattedDateString(blockData.minedAt * 1000)}
                color='gray'
                size='small'
                whiteSpace='wrap'
              />
            </div>
          </div>
          {!isSent && (
            <div className='message'>
              <div className='icon'>
                <JIcon size='medium' name='message' color='gray' />
              </div>
              <div className='text'>
                <JText value='Thanks man!' color='gray' size='normal' />
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
                  ${divDecimals(amount, assetDecimals)}
                  ${assetSymbol}
                `}
                color={color}
                size='normal'
                weight='bold'
                whiteSpace='wrap'
              />
            </div>
            {!isZero(amount) && (
              <div className='fiat'>
                <JText value='20,000 USD' color='gray' size='small' whiteSpace='wrap' />
              </div>
            )}
          </div>
          {!isAssetList && (
            <Fragment>
              {!isCustom ? (
                <div className='symbol -icon'>
                  <JAssetSymbol symbol={assetSymbol} color='gray' />
                </div>
              ) : (
                <div className='symbol -text'>
                  <JText
                    value={assetSymbol}
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
