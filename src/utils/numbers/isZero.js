// @flow

import toBigNumber from './toBigNumber'

function isZero(value: BigNumber | string | number | void): boolean {
  if (!value) {
    return true
  }

  return toBigNumber(value).eq(0)
}

export default isZero
