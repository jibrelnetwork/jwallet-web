// @flow

import { BigNumber } from 'bignumber.js'

export function divDecimals(
  value: BigNumber,
  decimals: number = 18
): BigNumber {
  const base = new BigNumber(10)
  const basePow = base.pow(decimals)

  return value.div(basePow)
}
