// @flow

type GetETHBalanceMethod = {|
  +name: 'getETHBalance',
|}

type GetERC20BalanceMethod = {|
  +name: 'getERC20Balance',
  +payload: {|
    +contractAddress: AssetAddress,
  |}
|}

type GetBalanceMethod = GetETHBalanceMethod | GetERC20BalanceMethod

type GetTransactionsName =
  'getETHTransactions' |
  'getERC20Transactions' |
  'getJNTTransactions'

type GetTransactionsPayload = {|
  +assetAddress: AssetAddress,
  +toBlock: number,
  +decimals: number,
  +fromBlock: number,
|}

type GetTransactionsMethod = {|
  +name: GetTransactionsName,
  +payload: GetTransactionsPayload,
|}

type SchedulerBalanceTask = {|
  +module: 'balances',
  +method: GetBalanceMethod,
  +priority?: number,
  +retryCount?: number,
|}

type SchedulerTransactionsTask = {|
  +module: 'transactions',
  +method: GetTransactionsMethod,
  +priority?: number,
  +retryCount?: number,
|}

declare type SchedulerTask = SchedulerBalanceTask | SchedulerTransactionsTask
