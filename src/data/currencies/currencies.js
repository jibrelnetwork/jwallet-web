// @flow

import { t } from 'ttag'

const CURRENCIES: FiatCurrencies = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: t`US Dollar`,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: t`Euro`,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: t`Pound Sterling`,
  },
  CNY: {
    code: 'CNY',
    symbol: '¥',
    name: t`Chinese Yuan`,
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: t`Japanese Yen`,
  },
  KRW: {
    code: 'KRW',
    symbol: '₩',
    name: t`South Korean won`,
  },
}

export default CURRENCIES
