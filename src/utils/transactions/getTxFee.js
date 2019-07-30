// @flow strict

import {
  toBigNumber,
  divDecimals,
  formatBalance,
  trimLeadingZeroes,
} from 'utils/numbers'

const ETH_DECIMALS: number = 18

export function getTxFee(gasUsed: number, gasPrice: string): string {
  if (!(gasUsed && gasPrice)) {
    return '0'
  }

  const value: BigNumber = toBigNumber(gasPrice).times(gasUsed)
  const valueDivDecimals: BigNumber = divDecimals(value, ETH_DECIMALS)
  const valueFormat: string = formatBalance(valueDivDecimals, 6)

  return trimLeadingZeroes(valueFormat)
}
