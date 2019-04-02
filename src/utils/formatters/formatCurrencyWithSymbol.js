// @flow

// How to format local currency
// https://developers.shopware.com/blog/2017/02/06/currency-formatting-is-easy-isnt-it/

import {
  toBigNumber,
  type ToBigNumberValue,
} from 'utils/numbers/toBigNumber'

function formatCurrencyWithSymbol(
  amount: ToBigNumberValue,
  currencyCode: string,
  locale: string = 'en-US',
): string {
  const opts = {
    style: 'currency',
    currency: currencyCode,
  }

  const numberAmount: number = toBigNumber(amount).toNumber()

  const numberFormat = new Intl.NumberFormat(locale, opts)

  return numberFormat.format(numberAmount)
}

export { formatCurrencyWithSymbol }
