// @flow

// $FlowFixMe
import BigNumber from 'bignumber.js'

import toBigNumber from './toBigNumber'

const UNIT_GWEI = '1000000000'

function fromWeiToGWei(value: string | number | BigNumber): string {
  return toBigNumber(value)
    .round(0, BigNumber.ROUND_DOWN)
    .div(UNIT_GWEI)
    .toString(10)
}

export default fromWeiToGWei
