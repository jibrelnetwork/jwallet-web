// @flow

import { BigNumber } from 'bignumber.js'

import { divDecimals } from '../numbers'

function parseBalance(
  value: string | number | BigNumber,
  decimals: number = 18
): string {
  const normalized = divDecimals(new BigNumber(value), decimals)

  return normalized.toString()
}

export default parseBalance
