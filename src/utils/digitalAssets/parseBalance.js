// @flow

import divDecimals from 'utils/numbers/divDecimals'

function parseBalance(balance: ?Balance, decimals: number = 18): ?BalanceString {
  return (balance && balance.value) ? divDecimals(balance.value, decimals) : null
}

export default parseBalance
