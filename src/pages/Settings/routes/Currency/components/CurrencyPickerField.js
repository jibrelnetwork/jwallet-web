// @flow

import React from 'react'

import JText from 'components/base/JText'
import currenciesData from 'data/currencies'
import formatCurrency from 'utils/formatters/formatCurrency'
import JPicker, { JPickerItem } from 'components/base/JPicker'

import './currencyPickerField.scss'

import { CurrencyPickerCurrent } from './CurrencyPickerCurrent'

const CURRENCY_CODES: FiatCurrency[] = Object.keys(currenciesData)

export const CurrencyPickerField = ({ input }: any) => {
  const {
    onChange,
    value,
  } = input

  const currentCurrencyTitle = currenciesData[value]

  return (
    <JPicker
      currentRenderer={() => <CurrencyPickerCurrent title={currentCurrencyTitle} />}
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

