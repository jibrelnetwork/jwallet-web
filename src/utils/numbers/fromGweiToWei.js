// @flow

// $FlowFixMe
import BigNumber from 'bignumber.js'

import toBigNumber from './toBigNumber'

const UNIT_GWEI = '1000000000'

function fromGweiToWei(value: string | number | BigNumber): string {
  return toBigNumber(value)
    .mul(UNIT_GWEI)
    .round(0, BigNumber.ROUND_DOWN)
    .toString(10)
}

export default fromGweiToWei
