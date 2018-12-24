// @flow

import BigNumber from './bigNumber'

function formatBalance(value: number | BigNumber | string): string {
  const valueBN = BigNumber(value)

  if (valueBN.eq(0)) {
    return '0.00'
  }

  // For more information, have a look here
  // http://mikemcl.github.io/bignumber.js/#toFor
  return valueBN.toFormat(2)
}

export default formatBalance
