// @flow

declare type GetBalanceMethod = {|
  +name: 'getAssetBalance',
  +payload: {|
    +blockNumber: number,
    +assetAddress: AssetAddress,
  |}
|}

declare type SchedulerBalanceTask = {|
  +module: 'balances',
  +method: GetBalanceMethod,
  +priority?: number,
  +retryCount?: number,
|}

declare type GetTransactionsName =
  'getETHTransactions' |
  'getTransferEventsTo' |
  'getTransferEventsFrom' |
  'getMintEvents' |
  'getBurnEvents' |
  'getBlockData' |
  'getTransactionData' |
  'getTransactionReceiptData'

declare type GetTransactionsPayload = {|
  +assetAddress: AssetAddress,
  +toBlock: number,
  +minBlock: number,
  +fromBlock: number,
|}

declare type GetTransactionsMethod = {|
  +name: GetTransactionsName,
  +payload: GetTransactionsPayload,
|}

declare type SchedulerTransactionsTask = {|
  +module: 'transactions',
  +method: GetTransactionsMethod,
  +priority?: number,
  +retryCount?: number,
|}

declare type GetTransactionName =
  'getBlockData' |
  'getTransactionData' |
  'getTransactionReceiptData'

declare type GetTransactionPayload = {|
  +hash: Hash,
  +blockNumber: BlockNumber,
  +assetAddress: AssetAddress,
  +transactionId: TransactionId,
|}

declare type GetTransactionMethod = {|
  +name: GetTransactionName,
  +payload: GetTransactionPayload,
|}

declare type SchedulerTransactionTask = {|
  +module: 'transaction',
  +method: GetTransactionMethod,
  +priority?: number,
  +retryCount?: number,
|}

declare type SchedulerTask =
  SchedulerBalanceTask |
  SchedulerTransactionsTask |
  SchedulerTransactionTask
