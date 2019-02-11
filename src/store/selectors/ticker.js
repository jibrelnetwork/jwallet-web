// @flow

import { selectSettingsFiatCurrency } from './settings'

export function selectTicker(state: AppState): TickerState {
  return state.ticker
}

export function selectTickerPersist(state: AppState): TickerPersist {
  const ticker: TickerState = selectTicker(state)

  return ticker.persist
}

export function selectTickerItems(state: AppState): FiatCourses {
  const tickerPersist: TickerPersist = selectTickerPersist(state)

  return tickerPersist.items
}

export function selectTickerItemByFiatId(state: AppState, fiatId: FiatId): ?FiatCourseById {
  const tickerItems: FiatCourses = selectTickerItems(state)

  return tickerItems[fiatId]
}

export function selectTickerItemCourseByCurrency(
  state: AppState,
  fiatId: FiatId,
  fiatCurrency?: ?FiatCurrency = null,
): ?string {
  const tickerItem: ?FiatCourseById = selectTickerItemByFiatId(state, fiatId)

  if (!tickerItem) {
    return null
  }

  const latestFiatCourse: ?FiatCourse = tickerItem.latest

  if (!latestFiatCourse) {
    return null
  }

  const currency: FiatCurrency = fiatCurrency || selectSettingsFiatCurrency(state)

  return latestFiatCourse[currency]
}
