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
    blockNumber: number,
    walletAddress: Address,
  |}
|}

declare type getERC20BalanceMethod = {|
  name: 'getERC20Balance',
  payload: {|
    blockNumber: number,
    contractAddress: Address,
    walletAddress: Address,
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
