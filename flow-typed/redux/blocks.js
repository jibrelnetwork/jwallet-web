// @flow

/* ::
import { BigNumber } from 'bignumber.js'

declare type ETHTransaction = {
  +blockHash: Hash,
  +blockNumber: number,
  +from: Address,
  +to: Address,
  +gas: number,
  +gasPrice: BigNumber,
  +hash: Hash,
  +input: Hash,
  +nonce: number,
  +r: string,
  +s: string,
  +v: string,
  +transactionIndex: number,
  +value: BigNumber,
}

declare type ETHBlock = {|
  +hash: Hash,
  +parentHash: Hash,
  +number: number,
  +timestamp: number,
|}
*/

declare type BlockNumber = string
declare type BlockType = 'latest' | 'current' | 'processing'
declare type BlockId = Hash | BlockType | number

declare type BlockData = {|
  +hash: Hash,
  +parentHash: Hash,
  +number: number,
  +minedAt: number,
  +requestedAt: number,
  +isBalancesLoading: boolean,
  +isBalancesFetched: boolean,
  +isTransactionsLoading: boolean,
  +isTransactionsFetched: boolean,
|}

declare type Blocks = {|
  +latest: ?BlockData,
  +current: ?BlockData,
  +processing: ?BlockData,
|}

declare type BlocksByNetworkId = {
  +[NetworkId]: ?Blocks,
}

declare type BlocksPersist = {|
  +items: BlocksByNetworkId,
|}

declare type BlocksState = {|
  +persist: BlocksPersist,
  +isConnectionError: boolean,
|}
