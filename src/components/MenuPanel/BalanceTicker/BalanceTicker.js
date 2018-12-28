// @flow

import React from 'react'

import JText from 'components/base/JText'
import { formatBalance } from 'utils/numbers'

const TICKER_CURRENCY = 'ETH'

type Props = {|
  +ethBalance: ?Balance,
|}

function MenuPanelBalanceTicker({ ethBalance }: Props) {
  const amountRounded: string = formatBalance(ethBalance.value)

  return (
    <div className='menu-panel-balance-ticker'>
      <div className='title'>
        <JText value='Total Balance' color='white' size='small' fontCase='upper' />
      </div>
      <JText
        value={`${amountRounded} ${TICKER_CURRENCY}`}
        size='large'
        color='white'
        weight='bold'
      />
    </div>
  )
}

export default MenuPanelBalanceTicker
