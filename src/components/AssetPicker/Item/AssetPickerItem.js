// @flow

import React from 'react'
import classNames from 'classnames'

import AssetBalance from 'components/AssetBalance'
import { JAssetSymbol, JText } from 'components/base'

const AssetPickerItem = ({ name, symbol, balance, isActive, isLoading, isDisabled }: Props) => (
  <div
    className={classNames('asset-picker-item', isActive && '-active', isDisabled && '-disabled')}
  >
    <div className='info'>
      <div className='name'>
        <JText value={name} color='gray' weight='bold' />
      </div>
      <div className='balance'>
        <AssetBalance symbol={symbol} color='gray' balance={balance} isLoading={isLoading} />
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
  isActive: boolean,
  isLoading: boolean,
  isDisabled: boolean,
}

AssetPickerItem.defaultProps = {
  name: '',
  symbol: '',
  balance: 0,
  isActive: false,
  isLoading: false,
  isDisabled: false,
}

export default AssetPickerItem
