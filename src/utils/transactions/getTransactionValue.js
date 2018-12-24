// @flow

import BigNumber from 'utils/numbers/bigNumber'

function getTransactionValue(
  amount: string | number | BigNumber,
  decimals: Decimals,
): BigNumber {
  const value = BigNumber(amount)
  const ten = BigNumber(10)

  const decimalsPower = ten.pow(decimals)
  const fixedValue = value.times(decimalsPower).toFixed()

  return BigNumber(fixedValue)
}

export default getTransactionValue
