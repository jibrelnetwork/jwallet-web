// @flow

import React from 'react'
import classNames from 'classnames'
import { JLoader, JText } from 'react-components'

const AssetBalance = ({
  symbol,
  size,
  color,
  weight,
  balance,
  isLoading,
  isTransparent,
}: Props) => (
  <div
    className={classNames(
      'asset-balance',
      isLoading && '-loading',
      isTransparent && '-transparent',
    )}
  >
    {isLoading ? <JLoader color={color} /> : (
      <div className='balance'>
        <div className='integer'>
          <JText
            size={size}
            color={color}
            weight={weight}
            value={Math.floor(balance).toFixed()}
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
    )}
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

type Props = {
  symbol: string,
  weight: null | 'bold' | 'bolder',
  color: 'blue' | 'gray' | 'white',
  size: 'small' | 'normal' | 'large',
  balance: number,
  isLoading: boolean,
  isTransparent: boolean,
}

AssetBalance.defaultProps = {
  weight: null,
  size: 'normal',
  balance: 0,
  isTransparent: false,
}

export default AssetBalance
