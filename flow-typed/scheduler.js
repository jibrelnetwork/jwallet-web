// @flow

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
