// @flow

import { BigNumber } from 'bignumber.js'

function divDecimals(value: string, decimals: number = 18, dp?: number, rm?: number): string {
  const base = new BigNumber(10)
  const basePow = base.pow(decimals)

  return (new BigNumber(value)).div(basePow).toFormat(dp, rm)
}

export default divDecimals
