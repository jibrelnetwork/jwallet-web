// @flow

import toBigNumber from './toBigNumber'

const getTransactionValue = (
  amount: string | number,
  decimals: Decimals,
): Bignumber => {
  const value: Bignumber = toBigNumber(amount)
  const units: Bignumber = toBigNumber(10)

  const decimalsPower: Bignumber = units.pow(decimals)
  const fixedValue: string = value.times(decimalsPower).toFixed()

  return toBigNumber(fixedValue)
}

export default getTransactionValue
