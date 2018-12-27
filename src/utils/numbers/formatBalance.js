// @flow

import isZero from './isZero'
import toBigNumber from './bigNumber'

function formatBalance(
  value: BigNumber | string | number | void,
  dp?: number = 2,
  rm?: number,
): string {
  if (isZero(value)) {
    return '0.00'
  }

  const valueBN: BigNumber = toBigNumber(value)

  if (dp === 2) {
    if (valueBN.lt(0.01)) {
      return '>0.01'
    }
  } else if (dp === 4) {
    if (valueBN.lt(0.0001)) {
      return '>0.0001'
    }
  } else if (dp === 6) {
    if (valueBN.lt(0.000001)) {
      return '>0.000001'
    }
  }

  return valueBN.toFormat(dp, rm)
}

export default formatBalance
