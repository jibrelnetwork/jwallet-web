// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'

import { JText } from 'components/base'

type Props = {|
  +symbol: string,
  +weight: null | 'bold' | 'bolder',
  +color: 'blue' | 'gray' | 'white',
  +size: 'small' | 'normal' | 'large',
  +balance: number,
  +isTransparent: boolean,
|}

class AssetBalance extends PureComponent<Props> {
  static defaultProps = {
    symbol: '',
    weight: null,
    color: 'white',
    size: 'normal',
    balance: 0,
    isTransparent: false,
  }

  render() {
    const {
      symbol,
      size,
      color,
      weight,
      balance,
      isTransparent,
    } = this.props

    return (
      <div
        className={classNames(
          'asset-balance',
          isTransparent && '-transparent',
        )}
      >
        <div className='balance'>
          <div className='integer'>
            <JText
              size={size}
              color={color}
              weight={weight}
              value={Number(Math.floor(balance).toFixed()).toLocaleString('en-IN')}
            />
          </div>
          <div className='decimals'>
            <JText
              size={size}
              color={color}
              weight={weight}
              value={`${(balance - Math.floor(balance)).toFixed(2).substr(1)}`}
            />
          </div>
        </div>
        <div className='symbol'>
          <JText
            size={size}
            color={color}
            value={symbol}
            weight={weight}
            fontCase='upper'
          />
        </div>
      </div>
    )
  }
}

export default AssetBalance
