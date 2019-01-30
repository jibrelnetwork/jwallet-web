// @flow

import React from 'react'

import JText from 'components/base/JText'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

type Props = {|
  +currency: FiatCurrency,
  +balance: number,
|}

function MenuPanelBalanceTicker({
  balance,
  currency,
}: Props) {
  return (
    <div className='menu-panel-balance-ticker'>
      <div className='title'>
        <JText value='Total Balance' color='white' size='tiny' fontCase='upper' />
      </div>
      <JText
        value={`${formatBalance((divDecimals(balance)))} ${currency}`}
        size='large'
        color='white'
        weight='bold'
      />
    </div>
  )
}

export default MenuPanelBalanceTicker
