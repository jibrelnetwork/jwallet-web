// @flow strict

import { i18n } from 'i18n/lingui'

export const CURRENCIES = {
  USD: {
    symbol: '$',
    name: i18n._('common.currency.usd', null, { defaults: 'US Dollar' }),
  },
  EUR: {
    symbol: '€',
    name: i18n._('common.currency.eur', null, { defaults: 'Euro' }),
  },
  GBP: {
    symbol: '£',
    name: i18n._('common.currency.gbp', null, { defaults: 'Pound Sterling' }),
  },
  CNY: {
    symbol: '¥',
    name: i18n._('common.currency.cny', null, { defaults: 'Chinese Yuan Renminbi' }),
  },
  JPY: {
    symbol: '¥',
    name: i18n._('common.currency.jpy', null, { defaults: 'Japanese Yen' }),
  },
  KRW: {
    symbol: '₩',
    name: i18n._('common.currency.krw', null, { defaults: 'South Korean won' }),
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
