// @flow

import { selectTickerItems } from 'store/selectors/ticker'
import { selectSettingsFiatCurrencyData } from 'store/selectors/settings'

export function getFiatBalance(
  state: AppState,
  digitalAsset: DigitalAssetWithBalance,
): ?number {
  const fiatCourses = selectTickerItems(state)
  const currentFiatCurrencyCode = selectSettingsFiatCurrencyData(state).code

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

  const fiatCourseValue = fiatCourse[currentFiatCurrencyCode]

  if (!fiatCourseValue) {
    return null
  }

  return Number(fiatCourseValue) * Number(balance.value)
}
