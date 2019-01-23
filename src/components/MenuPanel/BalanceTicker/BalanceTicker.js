// @flow

import React from 'react'

import JText from 'components/base/JText'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

const TICKER_CURRENCY = 'USD'

type Props = {|
  +balance: number,
|}

function MenuPanelBalanceTicker({ balance }: Props) {
  return (
    <div className='menu-panel-balance-ticker'>
      <div className='title'>
        <JText value='Total Balance' color='white' size='small' fontCase='upper' />
      </div>
      <JText
        value={`${formatBalance((divDecimals(balance)))} ${TICKER_CURRENCY}`}
        size='large'
        color='white'
        weight='bold'
      />
    </div>
  )
}

export default MenuPanelBalanceTicker
