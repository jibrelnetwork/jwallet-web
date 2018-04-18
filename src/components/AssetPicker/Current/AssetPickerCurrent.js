// @flow

import React from 'react'
import classNames from 'classnames'

import balanceToString from 'utils/digitalAssets/balanceToString'
import { JAssetSymbol, JText } from 'components/base'

/**
 * isOpen & disabled props are proxied from JSelect (via React.cloneElement)
 * please refer to components/JSelect/JSelect.js
 */
const AssetPickerCurrent = ({ name, symbol, balance, isOpen, disabled }: Props) => (
  <div className={classNames('asset-picker-current', isOpen && '-active', disabled && '-disabled')}>
    <div className='name'>
      <JText
        value={`${name}: ${balanceToString(balance)} ${symbol}`}
        color='gray'
        size='large'
        weight='bold'
      />
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
  disabled: boolean,
}

AssetPickerCurrent.defaultProps = {
  name: '',
  symbol: '',
  balance: 0,
  isOpen: false,
  disabled: false,
}

export default AssetPickerCurrent
