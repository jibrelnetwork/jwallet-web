// @flow

import classNames from 'classnames'

import React, {
  Fragment,
  PureComponent,
} from 'react'

import handle from 'utils/eventHandlers/handle'
import getFormattedDateString from 'utils/time/getFormattedDateString.js'

import {
  getTxAmount,
  getAddressLink,
} from 'utils/transactions'

import {
  JIcon,
  JText,
  JAssetSymbol,
} from 'components/base'

type Props = {|
  +setActive: (boolean) => void,
  +data: TransactionWithAssetAddress,
  +assetSymbol: string,
  +blockExplorerSubdomain: string,
  +assetDecimals: number,
  +isActive: boolean,
  +isCustom: boolean,
  +isReceived: boolean,
  +isAssetList: boolean,
|}

class TransactionItemMain extends PureComponent<Props> {
  static defaultProps = {
    isActive: false,
    isCustom: false,
    isReceived: false,
    isAssetList: false,
  }

  render() {
    const {
      setActive,
      data,
      assetSymbol,
      blockExplorerSubdomain,
      assetDecimals,
      isActive,
      isCustom,
      isReceived,
      isAssetList,
    } = this.props

    const {
      blockData,
      to,
      from,
      hash,
      amount,
    }: TransactionWithAssetAddress = data

    if (!blockData) {
      return null
    }

    const color = isReceived ? 'blue' : 'gray'
    const txAddress: OwnerAddress = isReceived ? from : to
    const iconName = isReceived ? 'transaction-receive' : 'transaction-send'

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
            <div className='hash'>
              <a
                href={getAddressLink(txAddress, blockExplorerSubdomain)}
                target='_blank'
                className='link'
                rel='noopener noreferrer'
              >
                <JText
                  color={color}
                  value={txAddress}
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
          {isReceived && (
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
                  ${isReceived ? '+' : '-'}
                  ${getTxAmount(amount, assetDecimals)}
                  ${assetSymbol}
                `}
                color={color}
                size='normal'
                weight='bold'
                whiteSpace='wrap'
              />
            </div>
            <div className='fiat'>
              <JText value='20,000 USD' color='gray' size='small' whiteSpace='wrap' />
            </div>
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
