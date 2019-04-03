// @flow strict

// How to format local currency
// https://developers.shopware.com/blog/2017/02/06/currency-formatting-is-easy-isnt-it/

import {
  toBigNumber,
  type ToBigNumberValue,
} from 'utils/numbers/toBigNumber'

export function formatCurrencyWithSymbol(
  amount: ToBigNumberValue,
  currencyCode: string,
  locale: string = 'en-US',
): string {
  try {
    const opts = {
      style: 'currency',
      currency: currencyCode,
    }

    const numberAmount: number = toBigNumber(amount).toNumber()

    const numberFormat = new Intl.NumberFormat(locale, opts)

    return numberFormat.format(numberAmount)
  } catch (err) {
    if (err instanceof RangeError) {
      // Invalid currency code or locale (Intl.NumberFormat)
      const numberAmount: number = toBigNumber(amount).toNumber()

      return `${numberAmount} ${currencyCode}`
    } else {
      return `${amount} ${currencyCode}`
    }
  }
}
