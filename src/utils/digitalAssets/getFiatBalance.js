// @flow strict

export function getFiatBalance(
  {
    balance,
    priceFeed,
  }: DigitalAssetWithBalance,
  courses: FiatCourses,
  currency: FiatCurrencyCode,
): ?number {
  if (!(balance && priceFeed)) {
    return null
  }

  const courseById = courses[priceFeed.currencyID.toString()]

  if (!courseById) {
    return null
  }

  const course = courseById.latest

  if (!course) {
    return null
  }

  const courseValue = course[currency]

  if (!courseValue) {
    return null
  }

  return (Number(courseValue) || 0) * (Number(balance.value) || 0)
}
