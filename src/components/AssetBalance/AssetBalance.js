// @flow

import React, { PureComponent } from 'react'
import BigNumber from 'bignumber.js'

import { divDecimals } from 'utils/numbers'
import { JText } from 'components/base'

type Props = {|
  +symbol: string,
  +color: 'blue' | 'gray',
  +size: 'small' | 'normal' | 'header',
  +balance: typeof BigNumber | string | number,
  +decimals: number,
|}

class AssetBalance extends PureComponent<Props> {
  static defaultProps = {
    color: 'gray',
    size: 'normal',
    decimals: 18,
  }

  render() {
    const {
      symbol,
      size,
      color,
      balance,
      decimals,
    } = this.props

    if (!(balance instanceof BigNumber)) {
      console.error(`AssetBalance: invalid balance type (required: BigNumber, expected: ${balance}`)
      return null
    }

    const balanceValue = divDecimals(balance, decimals).toString()
    // const balanceValue = balance.toLocaleString('en-US', { maximumFractionDigits: 2 })

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
