// @flow

import BigNumber from 'bignumber.js'

const toBigNumber = (value: string | number): Bignumber => {
  return new BigNumber((parseFloat(value) || 0), 10)
}

export default toBigNumber
