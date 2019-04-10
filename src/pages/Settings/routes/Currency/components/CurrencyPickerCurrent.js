import React from 'react'
import { t } from 'ttag'

import { JText } from 'components/base'

export const CurrencyPickerCurrent = ({
  title,
}) => (
  <div className='currency-picker-current'>
    <JText
      value={t`Select currency`}
      size='small'
      color='dusk'
    />
    <JText value={title} color='dark' />
  </div>
)
