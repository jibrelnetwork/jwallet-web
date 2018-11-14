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
      <JText value='Total Balance' color='white' size='small' />
      <JText value={`${amountDivided} ${TICKER_CURRENCY}`} color='white' size='large' />
    </div>
  )
}

export default MenuPanelBalanceTicker
