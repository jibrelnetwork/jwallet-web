import React from 'react'
import { JText } from 'components/base'

export const CurrencyPickerCurrent = ({
  title,
}) => (
  <div className='currency-picker-current'>
    <JText
      value='Select currency'
      size='small'
      color='dusk'
    />
    <JText value={title} color='dark' />
  </div>
)
