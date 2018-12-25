// @flow

import BigNumber from 'utils/numbers/bigNumber'

function isZero(amount: BigNumber | string | number): boolean {
  if (!amount) {
    return true
  }

  return BigNumber(amount).eq(0)
}

export default isZero
