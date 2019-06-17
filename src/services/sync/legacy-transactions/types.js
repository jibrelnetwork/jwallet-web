// @flow strict

import { type HistoryBlocksState } from './modules/blocks'
import { type TransactionsItemsState } from './modules/transactions'
import { type NetworkState } from './modules/network'
import { type PrioritiesState } from './modules/priorities'

export type HistoryState = {|
  +blocks: HistoryBlocksState,
  +network: NetworkState,
  +transactions: TransactionsItemsState,
  +priorities: PrioritiesState,
|}
