import React from 'react'
import JPicker, { JPickerItem } from 'components/base/JPicker'
import { JText } from 'components/base'
import { CURRENCIES_MAP } from 'data/settings'

import './currencyPickerField.scss'

import { CurrencyPickerCurrent } from './CurrencyPickerCurrent'

const CURRENCY_CODES = Object.keys(CURRENCIES_MAP)

export const CurrencyPickerField = (props) => {
  const {
    input,
  } = props

  const {
    onChange,
  } = input

  const currentCurrencyTitle = CURRENCIES_MAP[input.value]

  return (
    <JPicker
      currentRenderer={() => <CurrencyPickerCurrent title={currentCurrencyTitle} />}
    >
      {CURRENCY_CODES.map(code => (
        <JPickerItem
          key={code}
          value={code}
          onSelect={onChange}
        >
          <JText color='gray' value={CURRENCIES_MAP[code]} />
        </JPickerItem>
      ))}
    </JPicker>
  )
}

