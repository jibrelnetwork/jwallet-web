// @flow

import { toBigNumber } from './toBigNumber'

type IsZeroValue = BigNumber | string | number | void

function isZero(value: IsZeroValue): boolean {
  if (!value) {
    return true
  }

  return toBigNumber(value).eq(0)
}

export default isZero
