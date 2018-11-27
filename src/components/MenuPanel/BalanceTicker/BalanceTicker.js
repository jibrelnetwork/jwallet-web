// @flow

import React from 'react'

import JText from 'components/base/JText'
import { round, divideThousands } from 'utils/numbers'

const TICKER_AMOUNT = 3589.45
const TICKER_CURRENCY = 'USD'

function MenuPanelBalanceTicker() {
  const amountRounded: string = round(TICKER_AMOUNT, 2)
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
