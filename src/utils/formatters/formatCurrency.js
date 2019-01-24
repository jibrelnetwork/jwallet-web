// @flow

import currenciesData from 'data/currencies'

function formatCurrency(curCode: FiatCurrency): string {
  const currencyDescription: ?string = currenciesData[curCode]

  if (!currencyDescription) {
    throw new Error('InvalidFiatCurrencyCode')
  }

  return currencyDescription
}

export default formatCurrency
