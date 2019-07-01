// @flow strict

import { type ConfigState } from './modules/config'
import { type HistoricalSyncState } from './modules/historical'
import { type HistoryBlocksState } from './modules/blocks'

export type HistoryState = {|
  +blocks: HistoryBlocksState,
  +config: ConfigState,
  +historical: HistoricalSyncState,
|}

// Structures got from remotes

export type RawEtherscanTransaction = {|
  blockNumber: string,
  timeStamp: string,
  hash: string,
  nonce: string,
  blockHash: string,
  transactionIndex: string,
  from: string,
  to: string,
  value: string,
  gas: string,
  gasPrice: string,
  isError: string,
  txreceipt_status: string,
  input: string,
  contractAddress: string,
  cumulativeGasUsed: string,
  gasUsed: string,
  confirmations: string,
|}

export type RawTransaction = {|
  blockHash: string,
  blockNumber: string,
  from: string,
  gas: string,
  gasPrice: string,
  hash: string,
  input: string,
  nonce: string,
  to: string,
  transactionIndex: string,
  value: string,
  v: string,
  r: string,
  s: string,
|}

export type RawEvent = {|
  address: string,
  blockHash: string,
  blockNumber: string,
  data: string,
  logIndex: string,
  removed: boolean,
  topics: string[],
  transactionHash: string,
  transactionIndex: string,
|}

export type RawTransactionReceipt = {|
  transactionHash: string,
  transactionIndex: string,
  blockNumber: string,
  blockHash: string,
  cumulativeGasUsed: string,
  gasUsed: string,
  contractAddress: ?string,
  logs: any[],
  logsBloom: string,
  status: string,
|}

export type RawBlock = {|
  number: string,
  hash: string,
  parentHash: string,
  nonce: string,
  sha3Uncles: string,
  logsBloom: string,
  transactionsRoot: string,
  stateRoot: string,
  miner: string,
  difficulty: string,
  totalDifficulty: string,
  extraData: string,
  size: string,
  gasLimit: string,
  gasUsed: string,
  timestamp: string,
  transactions: string[] | RawTransaction[],
  uncles: string[],
|}

// Structures to store in db

export type DBTransaction = {|
  id: string, // primary key
  assetAddress: string, // index
  timestamp: number, // index
  type: string, // index
  // transferIn
  // transferOut
  // mint
  // burn
  // contractCall
  // ...
  blockNumber: number, // index
  blockHash: string,
  from: string,
  to: string,
  amount: string, // in decimal format
  hash: string, // parent tx hash for events
  gasLimit: string, // in decimal format, parent value for events
  gasUsed: string, // in decimal format
  gasPrice: string, // in decimal format, parent value for events
  status: number, // 1 for success, 0 for fail
  nonce: number, // parent value for events
|}

export type DBBlock = {
  id: string, // primary key, block number as string for now
  number: number,
  hash: string, // index
  parentHash: string,
  timestamp: number,
  transactions: string[],
}
