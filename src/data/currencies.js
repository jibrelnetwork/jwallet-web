// @flow strict

import { t } from 'ttag'

export const CURRENCIES = {
  USD: {
    symbol: '$',
    name: t`US Dollar`,
  },
  EUR: {
    symbol: '€',
    name: t`Euro`,
  },
  GBP: {
    symbol: '£',
    name: t`Pound Sterling`,
  },
  CNY: {
    symbol: '¥',
    name: t`Chinese Yuan Renminbi`,
  },
  JPY: {
    symbol: '¥',
    name: t`Japanese Yen`,
  },
  KRW: {
    symbol: '₩',
    name: t`South Korean won`,
  },
}

export type FiatCurrencyCode = $Keys<typeof CURRENCIES>

export type FiatCurrencyData = {
  symbol: string,
  name: string,
}

export type FiatCurrencies = {
  [code: FiatCurrencyCode]: FiatCurrencyData,
}
