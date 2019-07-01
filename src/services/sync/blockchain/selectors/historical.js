// @flow strict

import { type HistoryState } from '../types'

export function selectAssetsSyncRanges(state: HistoryState) {
  return state.historical
}
