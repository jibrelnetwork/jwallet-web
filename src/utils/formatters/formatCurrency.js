// @flow

import { t } from 'ttag'

import currenciesData from 'data/currencies'

function formatCurrency(fiatCurrency: FiatCurrency): string {
  const fiatCurrencyData: ?FiatCurrencyData = currenciesData[fiatCurrency]

  if (!fiatCurrencyData) {
    throw new Error(t`InvalidFiatCurrencyCode`)
  }

  return fiatCurrencyData.name
}

export default formatCurrency
