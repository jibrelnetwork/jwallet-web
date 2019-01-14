// @flow

// $FlowFixMe
import BigNumber from 'bignumber.js'

function toBigNumber(value: BigNumber | string | number | void, base?: number = 10): BigNumber {
  BigNumber.config({ EXPONENTIAL_AT: 1e+9 })
  return new BigNumber(value || 0, base)
}

export default toBigNumber
