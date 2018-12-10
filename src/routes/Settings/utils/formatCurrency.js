// @flow
import { CURRENCIES_MAP } from 'data/settings'

export default function formatCurrency(curCode: CurrencyCode): string {
  return CURRENCIES_MAP[curCode] || CURRENCIES_MAP.USD
}
