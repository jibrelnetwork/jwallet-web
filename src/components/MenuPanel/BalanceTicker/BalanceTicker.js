// @flow

import React from 'react'

import JText from 'components/base/JText'
import { formatBalance, divideThousands } from 'utils/numbers'

const TICKER_CURRENCY = 'ETH'

type Props = {|
  +ethBalances: ?Balance,
|}

function MenuPanelBalanceTicker({ ethBalances }: Props) {
  const amountRounded: string = formatBalance(ethBalances.value)
  const amountDivided: string = divideThousands(amountRounded)

  return (
    <div className='menu-panel-balance-ticker'>
      <div className='title'>
        <JText value='Total Balance' color='white' size='small' fontCase='upper' />
      </div>
      <JText
        value={`${amountDivided} ${TICKER_CURRENCY}`}
        size='large'
        color='white'
        weight='bold'
      />
    </div>
  )
}

export default MenuPanelBalanceTicker
