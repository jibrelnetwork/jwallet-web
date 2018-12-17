// @flow

import BigNumber from 'bignumber.js'

function bigNumber(value: string | number | BigNumber, base: number = 10): BigNumber {
  if (!value) {
    return new BigNumber(0, base)
  }
  return new BigNumber(value, base)
}

export default bigNumber
