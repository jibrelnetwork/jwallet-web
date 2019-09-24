// @flow strict

import { checkETH } from '.'

export function getFiatBalance(
  {
    balance,
    blockchainParams,
  }: DigitalAssetWithBalance,
  courses: FiatCourses,
  currency: FiatCurrencyCode,
  timestamp?: FiatTimestamp = 'latest',
): ?number {
  if (!(balance)) {
    return null
  }

  const assetId: string = checkETH(blockchainParams.address) ? 'ETH' : blockchainParams.address
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

  return (Number(courseValue) || 0) * (Number(balance.value) || 0)
}
