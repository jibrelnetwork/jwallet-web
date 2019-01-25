// @flow

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
