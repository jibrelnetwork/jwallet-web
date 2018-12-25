// @flow

import { divDecimals } from '../numbers'

function parseBalance(value: string, decimals: number = 18): string {
  return divDecimals(value, decimals)
}

export default parseBalance
