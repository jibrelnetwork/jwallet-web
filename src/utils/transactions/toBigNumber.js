// @flow

import BigNumber from 'bignumber.js'

function toBigNumber(value: string | number) {
  return new BigNumber(value || 0)
}

export default toBigNumber
