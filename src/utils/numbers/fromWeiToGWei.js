// @flow

// $FlowFixMe
import BigNumber from 'bignumber.js'

import {
  toBigNumber,
  type ToBigNumberValue,
} from './toBigNumber'

const UNIT_GWEI = '1000000000'

function fromWeiToGWei(value: ToBigNumberValue): string {
  return toBigNumber(value)
    .round(0, BigNumber.ROUND_DOWN)
    .div(UNIT_GWEI)
    .toString(10)
}

export default fromWeiToGWei
