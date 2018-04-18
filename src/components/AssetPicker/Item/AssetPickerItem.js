// @flow

import React from 'react'
import classNames from 'classnames'

import balanceToString from 'utils/digitalAssets/balanceToString'
import { JAssetSymbol, JText } from 'components/base'

const AssetPickerItem = ({ name, symbol, balance, active, disabled }: Props) => (
  <div className={classNames('asset-picker-item', active && '-active', disabled && '-disabled')}>
    <div className='info'>
      <div className='name'>
        <JText value={name} color='gray' weight='bold' />
      </div>
      <div className='balance'>
        <JText value={`${balanceToString(balance)} ${symbol}`} color='gray' />
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
  active: boolean,
  disabled: boolean,
}

AssetPickerItem.defaultProps = {
  name: '',
  symbol: '',
  balance: 0,
  active: false,
  disabled: false,
}

export default AssetPickerItem
