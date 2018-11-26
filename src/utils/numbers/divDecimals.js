// @flow

import BigNumber from 'bignumber.js'

export function divDecimals(
  value: typeof BigNumber,
  decimals: number = 18
): typeof BigNumber {
  const base = new BigNumber(10)
  const basePow = base.pow(new BigNumber(decimals))

  return value.div(basePow)
}
