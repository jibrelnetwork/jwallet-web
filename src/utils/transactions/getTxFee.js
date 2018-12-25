// @flow

import BigNumber from '../numbers/bigNumber'

function getTxFee(gasUsed: number, gasPrice: string, decimals: number): string {
  const base: BigNumber = BigNumber(10)
  const basePow: BigNumber = base.pow(decimals)
  const gasPriceBN: BigNumber = BigNumber(gasPrice)

  return gasPriceBN.times(gasUsed).div(basePow).toFormat()
}

export default getTxFee
