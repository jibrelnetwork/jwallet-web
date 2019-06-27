// @flow strict

import { t } from 'ttag'

export const CURRENCIES: FiatCurrencies = {
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
    name: t`Chinese Yuan`,
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
