// @flow strict

import { i18n } from 'i18n/lingui'

import { CURRENCIES } from 'data'

function formatCurrency(fiatCurrency: FiatCurrency): string {
  const fiatCurrencyData: ?FiatCurrencyData = CURRENCIES[fiatCurrency]

  if (!fiatCurrencyData) {
    throw new Error(i18n._(
      'formatters.formatCurrency.errors.codeInvalid',
      null,
      { defaults: 'Invalid Fiat Currency Code' },
    ))
  }

  return fiatCurrencyData.name
}

export default formatCurrency
