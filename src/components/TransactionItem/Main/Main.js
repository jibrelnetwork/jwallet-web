// @flow

import React, { PureComponent, Fragment } from 'react'
import classNames from 'classnames'
import { getTxAmount, getAddressLink } from 'utils/transactions'
import getFormattedDateString from 'utils/time/getFormattedDateString.js'

import { handle } from 'utils/eventHandlers'
import { JIcon, JAssetSymbol, JText } from 'components/base'

type Props = {|
  +setActive: (boolean) => void,
  +data: TransactionWithAssetAddress,
  +networkId: NetworkId,
  +assetDecimals: number,
  +assetSymbol: string,
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
      networkId,
      assetDecimals,
      assetSymbol,
      isActive,
      isCustom,
      isReceived,
      isAssetList,
    } = this.props

    const color = isReceived ? 'blue' : 'gray'
    const iconName = isReceived ? 'transaction-receive' : 'transaction-send'

    return (
      <div
        onClick={handle(setActive)(data.hash)}
        className={classNames('transaction-item-main', isActive && '-active')}
      >
        <div className='box'>
          <div className='status'>
            <JIcon size='medium' name={iconName} />
          </div>
          <div className='data'>
            <div className='hash'>
              <a
                href={getAddressLink(data.hash, isReceived ? data.to : data.from, networkId)}
                target='_blank'
                className='link'
                rel='noopener noreferrer'
              >
                <JText
                  value={isReceived ? data.to : data.from}
                  color={color}
                  weight='bold'
                  size='normal'
                />
              </a>
            </div>
            <div className='time'>
              <JText
                value={getFormattedDateString(data.blockData.minedAt * 1000)}
                color='gray'
                size='small'
                whiteSpace='wrap'
              />
            </div>
          </div>
          {!isReceived && (
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
                  ${getTxAmount(data.amount, assetDecimals)}
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
