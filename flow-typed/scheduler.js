// @flow

declare type SchedulerModule = 'balances' | 'transactions'

declare type GetETHBalanceMethod = {|
  +name: 'getETHBalance',
|}

declare type GetERC20BalanceMethod = {|
  +name: 'getERC20Balance',
  +payload: {|
    +contractAddress: AssetAddress,
  |}
|}

declare type GetBalanceMethod = GetETHBalanceMethod | GetERC20BalanceMethod

declare type GetTransactionsName =
  'getETHTransactions' |
  'getERC20Transactions' |
  'getJNTTransactions'

declare type GetTransactionsPayload = {|
  +assetAddress: AssetAddress,
  +toBlock: number,
  +decimals: number,
  +fromBlock: number,
|}

declare type GetTransactionsMethod = {|
  +name: GetTransactionsName,
  +payload: GetTransactionsPayload,
|}

type SchedulerMethod = GetBalanceMethod | GetTransactionsMethod

declare type SchedulerTask = {|
  +module: SchedulerModule,
  +method: SchedulerMethod,
  +priority?: number,
  +retryCount?: number,
|}
