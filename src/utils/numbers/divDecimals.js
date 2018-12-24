// @flow

import BigNumber from './bigNumber'

function divDecimals(value: string, decimals: number = 18, dp?: number, rm?: number): string {
  const base = BigNumber(10)
  const basePow = base.pow(decimals)

  return BigNumber(value).div(basePow).toFormat(dp, rm)
}

export default divDecimals
