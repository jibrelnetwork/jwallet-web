// @flow

import { CURRENCIES_MAP } from 'data/settings'

function formatCurrency(curCode: FiatCurrency): string {
  return CURRENCIES_MAP[curCode] || CURRENCIES_MAP.USD
}

export default formatCurrency
