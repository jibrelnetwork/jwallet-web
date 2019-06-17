// @flow strict

import {
  combineReducers,
  type Reducer,
} from 'redux'

import blocks from './modules/blocks'
import network from './modules/network'
import transactions from './modules/transactions'
import priorities from './modules/priorities'

import { type HistoryState } from './types'
import { type HistoryAction } from './modules/core'

export function makeRootReducer(): Reducer<HistoryState, HistoryAction> {
  return combineReducers({
    blocks,
    network,
    transactions,
    priorities,
  })
}
