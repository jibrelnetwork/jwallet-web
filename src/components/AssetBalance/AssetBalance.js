// @flow

import React, { PureComponent } from 'react'

import { JText } from 'components/base'

type Props = {|
  +symbol: string,
  +color: 'blue' | 'gray',
  +size: 'normal' | 'header',
  +balance: number,
|}

class AssetBalance extends PureComponent<Props> {
  static defaultProps = {
    color: 'gray',
    size: 'normal',
  }
  render() {
    const {
      symbol,
      size,
      color,
      balance,
    } = this.props

    const balanceValue = balance.toLocaleString('en-US', { maximumFractionDigits: 2 })

    return (
      <div className='asset-balance'>
        <div className='balance'>
          <JText
            weight='bold'
            size={size}
            color={color}
            value={balanceValue}
          />
        </div>
        <div className='symbol'>
          <JText
            weight='bold'
            fontCase='upper'
            size={size}
            color={color}
            value={symbol}
          />
        </div>
      </div>
    )
  }
}

export default AssetBalance
