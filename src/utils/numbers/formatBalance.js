// @flow

import {
  isZero,
  toBigNumber,
} from '.'

import type { ToBigNumberValue } from './toBigNumber'

function formatBalance(value: ?ToBigNumberValue, dp?: number = 2, rm?: number): string {
  if (isZero(value)) {
    return '0.00'
  }

  const valueBN: BigNumber = toBigNumber(value)

  if (dp === 2) {
    if (valueBN.lt(0.01)) {
      return '<\u202F0.01'
    }
  } else if (dp === 4) {
    if (valueBN.lt(0.0001)) {
      return '<\u202F0.0001'
    }
  } else if (dp === 6) {
    if (valueBN.lt(0.000001)) {
      return '<\u202F0.000001'
    }
  }

  return valueBN.toFormat(dp, rm)
}

export default formatBalance
