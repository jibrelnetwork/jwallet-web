// @flow

import BigNumber from 'bignumber.js'
import toBigNumber from './toBigNumber'
import rawUnits from './units.json'

const units = Object.keys(rawUnits).reduce((res, unit) => ({
  ...res,
  [unit]: toBigNumber(rawUnits[unit]),
}), {})

function convertEth(value: string, from: string, to: string): ?string {
  try {
    const valueBn = toBigNumber(value)

    if (valueBn.isNaN()) {
      return null
    }

    const fromValue = from.toLowerCase()
    if (!units[fromValue]) {
      return null
    }

    const toValue = to.toLowerCase()
    if (!units[toValue]) {
      return null
    }

    return toBigNumber(valueBn)
      .mul(units[fromValue])
      .round(0, BigNumber.ROUND_DOWN)
      .div(units[toValue])
      .toString(10)
  } catch (err) {
    return null
  }
}

export default convertEth
