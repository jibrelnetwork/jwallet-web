// @flow

import {
  toBigNumber,
  divDecimals,
  formatBalance,
} from 'utils/numbers'

function getTxFee(gasUsed: number, gasPrice: string, decimals: number): string {
  const value: BigNumber = toBigNumber(gasPrice).times(gasUsed)
  const valueDivDecimals: BigNumber = divDecimals(value, decimals)

  return formatBalance(valueDivDecimals, 6)
}

export default getTxFee
