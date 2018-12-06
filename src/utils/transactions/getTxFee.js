// @flow

import { BigNumber } from 'bignumber.js'

function getTxFee(gasUsed: string, gasPrice: string, decimals: number): string {
  const base: BigNumber = new BigNumber(10)
  const basePow: BigNumber = base.pow(decimals)
  const gasUsedBN: BigNumber = new BigNumber(gasUsed)
  const gasPriceBN: BigNumber = new BigNumber(gasPrice)

  return gasUsedBN.times(gasPriceBN).div(basePow).toFormat()
}

export default getTxFee
