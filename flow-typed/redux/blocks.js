// @flow

type NetworkIdOptional = ?string
// type BlockNumberOptional = ?string

declare type BlockId = number |
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

declare type ETHBlock = {
  difficulty: Bignumber,
  extraData: string,
  gasLimit: number,
  gasUsed: number,
  hash: Hash,
  logsBloom: string,
  miner: Address,
  mixHash: Hash,
  nonce: Hash,
  number: number,
  parentHash: Hash,
  receiptsRoot: Hash,
  sha3Uncles: Hash,
  size: number,
  stateRoot: Hash,
  timestamp: number,
  totalDifficulty: Bignumber,
  transactions: Array<Hash> | Array<ETHTransaction>,
  transactionsRoot: Hash,
  uncles: Array<Object>, // @TODO: flowtype it
}

declare type BlockInfo = {|
  +number: number,
  +requestedAt: Date,
  +hash: string,
  +parentHash: string,
  +timestamp: number,
  +isBalancesLoading?: boolean,
  +isBalancesReady?: boolean,
|}

declare type BlocksState = {
  +persist: {
    +blocks: {
      +[NetworkIdOptional]: {|
        +latestBlock: ?BlockInfo,
        +currentBlock: ?BlockInfo,
        +processedBlock: ?BlockInfo,
      |}
    }
  }
}

declare type SchedulerModule = 'balances' |
  'transactions'

declare type getERC20BalanceMethod = {|
  name: 'getERC20Balance',
  payload: {|
    blockNumber: number,
    contractAddress: Address,
    walletAddress: Address,
  |}
|}

declare type getETHBalanceMethod = {|
  name: 'getETHBalance',
  payload: {|
    blockNumber: number,
    walletAddress: Address,
  |}
|}

type SchedulerMethod = getERC20BalanceMethod |
  getETHBalanceMethod

declare type SchedulerTask = {|
  module: SchedulerModule,
  method: SchedulerMethod,
  retryCount?: number,
  priority?: number,
|}
