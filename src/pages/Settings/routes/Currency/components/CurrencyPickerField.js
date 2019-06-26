// @flow

import React from 'react'

import JText from 'components/base/JText'
import formatCurrency from 'utils/formatters/formatCurrency'
import JPicker, { JPickerItem } from 'components/base/JPicker'
import { CURRENCIES } from 'data'

import './currencyPickerField.scss'

import { CurrencyPickerCurrent } from './CurrencyPickerCurrent'

const CURRENCY_CODES: FiatCurrency[] = Object.keys(CURRENCIES)

export const CurrencyPickerField = ({ input }: any) => {
  const {
    onChange,
    value,
  } = input

  const fiatCurrencyData: ?FiatCurrencyData = CURRENCIES[value]

  if (!fiatCurrencyData) {
    return null
  }

  const { name }: FiatCurrencyData = fiatCurrencyData

  return (
    <JPicker
      currentRenderer={() => <CurrencyPickerCurrent title={name} />}
    >
      {CURRENCY_CODES.map((fiatCurrency: FiatCurrency) => (
        <JPickerItem
          onSelect={onChange}
          key={fiatCurrency}
          value={fiatCurrency}
        >
          <JText color='gray' value={formatCurrency(fiatCurrency)} />
        </JPickerItem>
      ))}
    </JPicker>
  )
}

