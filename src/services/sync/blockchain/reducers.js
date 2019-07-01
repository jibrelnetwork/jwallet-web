// @flow strict

import {
  combineReducers,
  type Reducer,
} from 'redux'

import blocks from './modules/blocks'
import config from './modules/config'
import historical from './modules/historical'

import { type HistoryState } from './types'
import { type HistoryAction } from './modules/core'

const reducers: Reducer<HistoryState, HistoryAction> = combineReducers({
  blocks,
  config,
  historical,
})

export default reducers

