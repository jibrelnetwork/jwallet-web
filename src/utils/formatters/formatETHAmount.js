// @flow

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import { type ToBigNumberValue } from 'utils/numbers/toBigNumber'

function formatETHAmount(amount: ToBigNumberValue) {
  return formatBalance(
    divDecimals(amount, 18),
    4,
  )
}

export {
  formatETHAmount,
}
