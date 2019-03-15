// @flow

// $FlowFixMe
import BigNumber from 'bignumber.js'

import toBigNumber, {
  type ToBigNumberValue,
} from './toBigNumber'

const UNIT_GWEI = '1000000000'

function fromGweiToWei(value: ToBigNumberValue): string {
  return toBigNumber(value)
    .mul(UNIT_GWEI)
    .round(0, BigNumber.ROUND_DOWN)
    .toString(10)
}

export default fromGweiToWei
