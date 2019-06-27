// @flow strict

import { t } from 'ttag'

import { CURRENCIES } from 'data'

function formatCurrency(fiatCurrency: FiatCurrency): string {
  const fiatCurrencyData: ?FiatCurrencyData = CURRENCIES[fiatCurrency]

  if (!fiatCurrencyData) {
    throw new Error(t`InvalidFiatCurrencyCode`)
  }

  return fiatCurrencyData.name
}

export default formatCurrency
