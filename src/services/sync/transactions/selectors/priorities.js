// @flow

import {
  get,
  values,
} from 'lodash-es'

import { type HistoryState } from '../types'

export function selectCurrentAddressCreatedBlockNumber(state: HistoryState) {
  return get(
    state,
    'priorities.current.meta.createdBlockNumber',
    0,
  )
}

export function selectCurrentAddress(state: HistoryState) {
  return get(
    state,
    'priorities.current.address',
    null,
  )
}

export function selectCurrentAssets(state: HistoryState) {
  return get(
    state,
    'priorities.current.digitalAssets',
    {},
  )
}

export function selectCurrentAssetsList(state: HistoryState) {
  const assets = selectCurrentAssets(state)

  return values(assets)
}
