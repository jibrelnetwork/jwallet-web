// @flow

import { BigNumber } from 'bignumber.js'

function isZero(amount: BigNumber | string | number): boolean {
  if (!amount) {
    return true
  }

  return (new BigNumber(amount).eq(0))
}

export default isZero
