// @flow

import toBigNumber from 'utils/numbers/toBigNumber'

function getTransactionValue(
  amount: BigNumber | string | number | void,
  decimals: Decimals,
): BigNumber {
  const base: BigNumber = toBigNumber(10)
  const value: BigNumber = toBigNumber(amount)
  const basePow: BigNumber = base.pow(decimals)

  return value.times(basePow)
}

export default getTransactionValue
