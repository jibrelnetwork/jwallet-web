// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import getFormattedDateString from 'utils/time/getFormattedDateString.js'

import { handle } from 'utils/eventHandlers'
import { JIcon, JAssetSymbol, JText } from 'components/base'

type Props = {|
  +setActive: Function,
  +data: TransactionWithAssetAddress,
  +assetDecimals: number,
  +assetSymbol: string,
  +isActive: boolean,
  +isCustom: boolean,
  +isReceived: boolean,
|}

class TransactionItemMain extends PureComponent<Props> {
  static defaultProps = {
    isActive: false,
    isCustom: false,
    isReceived: false,
  }

  render() {
    const {
      setActive,
      data,
      assetDecimals,
      assetSymbol,
      isActive,
      isCustom,
      isReceived,
    } = this.props

    const amount = data.amount / (10 ** assetDecimals)
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
              <JText
                value={isReceived ? data.to : data.from}
                color={color}
                weight='bold'
                size='normal'
              />
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
          <div className='message'>
            <div className='icon'>
              <JIcon size='medium' name='message' color='gray' />
            </div>
            <div className='text'>
              <JText value='Thanks man!' color='gray' size='normal' />
            </div>
          </div>
        </div>
        <div className='box'>
          <div className='balance'>
            <div className='crypto'>
              <JText
                value={`${isReceived ? '+' : '-'} ${amount} ${assetSymbol}`}
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
        </div>
      </div>
    )
  }
}

export default TransactionItemMain
