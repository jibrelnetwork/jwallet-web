import React from 'react'
import { i18n } from 'i18n/lingui'

import { JText } from 'components/base'

export const CurrencyPickerCurrent = ({
  title,
}) => (
  <div className='currency-picker-current'>
    <JText
      value={i18n._(
        'SettingsCurrency.select.label',
        null,
        { defaults: 'Select currency' },
      )}
      size='small'
      color='dusk'
    />
    <JText value={title} color='dark' />
  </div>
)
