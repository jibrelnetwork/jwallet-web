// @flow strict

export function getFiatBalance(
  {
    balance,
    priceFeed,
  }: DigitalAssetWithBalance,
  courses: FiatCourses,
  currency: FiatCurrencyCode,
  timestamp?: FiatTimestamp = 'latest',
): ?number {
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

  return (Number(courseValue) || 0) * (Number(balance.value) || 0)
}
