// @flow

import React from 'react'
import classNames from 'classnames'

import AssetBalance from 'components/AssetBalance'
import { JAssetSymbol, JText } from 'components/base'

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
        <JText value={`${name}:`} color='gray' size='semilarge' weight='bold' />
      </div>
      <div className='balance'>
        <AssetBalance
          symbol={symbol}
          size='semilarge'
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
  name: '',
  symbol: '',
  balance: 0,
  isOpen: false,
  isLoading: false,
  isDisabled: false,
}

export default AssetPickerCurrent
