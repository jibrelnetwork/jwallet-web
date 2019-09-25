// @flow strict

import { CURRENCIES } from 'data'
import { formatBalance } from 'utils/numbers'

export function formatFiatBalance(
  fiatBalance: BigNumber,
  fiatCurrency: FiatCurrencyCode,
): string {
  const currency: ?FiatCurrency = CURRENCIES[fiatCurrency]
  const currencySymbol: string = currency ? currency.symbol || '$' : '$'

  return `${currencySymbol}\u202F${formatBalance(fiatBalance)}`
}
