// @flow

import { BigNumber } from 'bignumber.js'

function getTransactionValue(
  amount: string | number | BigNumber,
  decimals: Decimals,
): BigNumber {
  const value = new BigNumber(amount)
  const ten = new BigNumber(10)

  const decimalsPower = ten.pow(decimals)
  const fixedValue = value.times(decimalsPower).toFixed()

  return new BigNumber(fixedValue)
}

export default getTransactionValue
