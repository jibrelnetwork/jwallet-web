// @flow strict

import {
  combineReducers,
  type Reducer,
} from 'redux'

import blocks from './modules/blocks'
import transactions from './modules/transactions'
import config from './modules/config'

import { type HistoryState } from './types'
import { type HistoryAction } from './modules/core'

const reducers: Reducer<HistoryState, HistoryAction> = combineReducers({
  blocks,
  config,
  transactions,
})

export default reducers

