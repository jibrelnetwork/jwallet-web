// @flow

declare type BlockNumber = string
declare type BlockType = 'latest' | 'current' | 'processing'

declare type BlockId =
  number |
  Hash |
  'earliest' |
  'latest' |
  'pending'

declare type ETHTransaction = {
  blockHash: Hash,
  blockNumber: number,
  from: Address,
  to: Address,
  gas: number,
  gasPrice: Bignumber,
  hash: Hash,
  input: Hash,
  nonce: number,
  r: string,
  s: string,
  v: string,
  transactionIndex: number,
  value: Bignumber,
}

declare type ETHBlock = {|
  +hash: Hash,
  +parentHash: Hash,
  +number: number,
  +timestamp: number,
|}

declare type BlockData = {|
  +number: number,
  +timestamp: number,
  +requestedAt: Date,
  +hash: Hash,
  +parentHash: Hash,
  +isBalancesLoading: boolean,
  +isBalancesFetched: boolean,
  +isTransactionsLoading: boolean,
  +isTransactionsFetched: boolean,
|}

// just leave it here
// now is not used
// declare type BlockRange = Array<{
//   start: number,
//   end: number,
//   assets: {
//     [AssetAddress]: Array<{
//       start: number,
//       end: number,
//       isLoaded: boolean
//     }>
//   }
// }>

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
|}
