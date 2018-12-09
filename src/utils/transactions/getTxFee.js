// @flow

import { BigNumber } from 'bignumber.js'

function getTxFee(gasUsed: number, gasPrice: string, decimals: number): string {
  const base: BigNumber = new BigNumber(10)
  const basePow: BigNumber = base.pow(decimals)
  const gasPriceBN: BigNumber = new BigNumber(gasPrice)

  return gasPriceBN.times(gasUsed).div(basePow).toFormat()
}

export default getTxFee
