// @flow strict

import { type HistoryBlocksState } from './modules/blocks'
import { type TransactionsItemsState } from './modules/transactions'
import { type ConfigState } from './modules/config'

export type HistoryState = {|
  +blocks: HistoryBlocksState,
  +config: ConfigState,
  +transactions: TransactionsItemsState,
|}
