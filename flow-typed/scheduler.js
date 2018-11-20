// @flow

declare type SchedulerModule = 'balances' | 'transactions'

declare type GetTransactionsName =
  'getETHTransactions' |
  'getERC20Transactions' |
  'getJNTTransactions'

declare type GetTransactionsPayload = {|
  +owner: Address,
  +asset: Address,
  +networkId: NetworkId,
  +toBlock: number,
  +decimals: number,
  +fromBlock: number,
|}

declare type getETHBalanceMethod = {|
  name: 'getETHBalance',
  payload: {|
    owner: Address,
    blockNumber: number,
  |}
|}

declare type getERC20BalanceMethod = {|
  name: 'getERC20Balance',
  payload: {|
    owner: Address,
    contractAddress: Address,
    blockNumber: number,
  |}
|}

declare type GetTransactionsMethod = {|
  name: GetTransactionsName,
  payload: GetTransactionsPayload,
|}

type SchedulerMethod =
  getETHBalanceMethod |
  getERC20BalanceMethod |
  GetTransactionsMethod

declare type SchedulerTask = {|
  +module: SchedulerModule,
  +method: SchedulerMethod,
  +priority?: number,
  +retryCount?: number,
|}
