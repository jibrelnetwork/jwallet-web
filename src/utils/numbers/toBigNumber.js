// @flow

// $FlowFixMe
import BigNumber from 'bignumber.js'

export type ToBigNumberValue = BigNumber | string | number

function toBigNumber(value: ?ToBigNumberValue, base?: number = 10): BigNumber {
  return new BigNumber(value || 0, base)
}

export default toBigNumber
