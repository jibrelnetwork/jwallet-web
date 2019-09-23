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
): number {
  if (!(balance)) {
    return 0
  }

  const assetId: string = checkETH(blockchainParams.address) ? 'ETH' : blockchainParams.address
  const courseById: ?FiatCourseById = courses[assetId]

  if (!courseById) {
    return 0
  }

  const course: ?FiatCourse = courseById[timestamp]

  if (!course) {
    return 0
  }

  const courseValue: ?string = course[currency]

  if (!courseValue) {
    return 0
  }

  return (Number(courseValue) || 0) * (Number(balance.value) || 0)
}
