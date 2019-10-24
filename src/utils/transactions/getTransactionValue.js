// @flow

import toBigNumber from 'utils/numbers/toBigNumber'

type TransactionAmountValue = BigNumber | string | number | void

function getTransactionValue(amount: TransactionAmountValue, decimals: Decimals): BigNumber {
  const base: BigNumber = toBigNumber(10)
  const value: BigNumber = toBigNumber(amount)
  const basePow: BigNumber = base.pow(decimals)

  return value.times(basePow)
}

export default getTransactionValue
