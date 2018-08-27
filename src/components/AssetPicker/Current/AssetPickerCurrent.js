// @flow

import React from 'react'
import classNames from 'classnames'
import { JAssetSymbol, JText } from 'react-components'

import AssetBalance from 'components/AssetBalance'

/**
 * isOpen & isDisabled & isLoading props are proxied from JSelect
 * (via React.cloneElement)
 *
 * please refer to components/JSelect/JSelect.js
 */
const AssetPickerCurrent = ({ name, symbol, balance, isOpen, isLoading, isDisabled }: Props) => (
  <div
    className={classNames('asset-picker-current', isOpen && '-active', isDisabled && '-disabled')}
  >
    <div className='info'>
      <div className='name'>
        <JText value={`${name}:`} color='gray' size='large' weight='bold' />
      </div>
      <div className='balance'>
        <AssetBalance
          symbol={symbol}
          size='large'
          color='gray'
          weight='bold'
          balance={balance}
          isLoading={isLoading}
        />
      </div>
    </div>
    <div className='symbol'>
      <JAssetSymbol symbol={symbol} color='gray' />
    </div>
  </div>
)

type Props = {
  name: string,
  symbol: string,
  balance: number,
  isOpen: boolean,
  isLoading: boolean,
  isDisabled: boolean,
}

AssetPickerCurrent.defaultProps = {
  balance: 0,
  isOpen: false,
  isLoading: false,
  isDisabled: false,
}

export default AssetPickerCurrent
