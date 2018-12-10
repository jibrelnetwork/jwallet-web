// @flow

import { BigNumber } from 'bignumber.js'

import { divDecimals } from '../numbers'

function parseBalance(
  value: string,
  decimals: number = 18
): string {
  const normalized = divDecimals(new BigNumber(value), decimals)

  return normalized.toString()
}

export default parseBalance
