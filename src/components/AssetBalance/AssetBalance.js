// @flow

import React from 'react'
import classNames from 'classnames'

import { JLoader, JText } from 'components/base'

const AssetBalance = ({ symbol, color, size, balance, isLoading }: Props) => (
  <div className={classNames(`asset-balance -${size}`, isLoading && '-loading')} >
    {isLoading ? <JLoader color={color} /> : (
      <div className='balance'>
        <div className='integer'>
          <JText
            size={size}
            color={color}
            value={Math.floor(balance).toFixed()}
            weight={(size === 'large') ? 'bolder' : null}
          />
        </div>
        <div className='decimals'>
          <JText
            size={size}
            color={color}
            weight={(size === 'large') ? 'bolder' : null}
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
        weight={(size === 'large') ? 'bolder' : null}
        fontCase='upper'
      />
    </div>
  </div>
)

type Props = {
  symbol: string,
  color: 'blue' | 'gray' | 'white',
  size: 'small' | 'normal' | 'large',
  balance: number,
  isLoading: boolean,
}

AssetBalance.defaultProps = {
  symbol: '',
  align: null,
  color: 'white',
  size: 'normal',
  balance: 0,
  isLoading: false,
}

export default AssetBalance
