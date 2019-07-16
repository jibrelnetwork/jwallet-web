// @flow strict

import { selectTickerItems } from 'store/selectors/ticker'
import { selectFiatCurrency } from 'store/selectors/user'

export function getFiatBalance(
  state: AppState,
  digitalAsset: DigitalAssetWithBalance,
): ?number {
  const fiatCourses = selectTickerItems(state)
  const currency = selectFiatCurrency(state)

  const {
    balance,
    priceFeed,
  } = digitalAsset

  if (!(balance && priceFeed)) {
    return null
  }

  const fiatCourseById = fiatCourses[priceFeed.currencyID.toString()]

  if (!fiatCourseById) {
    return null
  }

  const fiatCourse = fiatCourseById.latest

  if (!fiatCourse) {
    return null
  }

  const fiatCourseValue = fiatCourse[currency]

  if (!fiatCourseValue) {
    return null
  }

  return Number(fiatCourseValue) * Number(balance.value)
}
