// @flow

import toBigNumber from './toBigNumber'

function divDecimals(value: BigNumber | string | number | void, decimals?: number = 18): BigNumber {
  const base: BigNumber = toBigNumber(10)
  const basePow: BigNumber = base.pow(decimals)

  return toBigNumber(value).div(basePow)
}

export default divDecimals
