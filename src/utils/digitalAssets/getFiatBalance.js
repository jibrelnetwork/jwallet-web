// @flow strict

// $FlowFixMe
import BigNumber from 'bignumber.js'

import { divDecimals } from 'utils/numbers'

export function getFiatBalance(
  {
    balance,
    priceFeed,
    blockchainParams,
  }: DigitalAssetWithBalance,
  courses: FiatCourses,
  currency: FiatCurrencyCode,
  timestamp?: FiatTimestamp = 'latest',
): ?BigNumber {
  if (!(balance && priceFeed)) {
    return null
  }

  const assetId: string = priceFeed.currencyID.toString()
  const courseById: ?FiatCourseById = courses[assetId]

  if (!courseById) {
    return null
  }

  const course: ?FiatCourse = courseById[timestamp]

  if (!course) {
    return null
  }

  const courseValue: ?string = course[currency]

  if (!courseValue) {
    return null
  }

  const balanceValue: BigNumber = divDecimals(balance.value || 0, blockchainParams.decimals)

  return balanceValue.times(courseValue || 0)
}
