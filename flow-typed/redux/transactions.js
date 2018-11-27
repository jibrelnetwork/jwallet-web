// @flow

declare type Hash = string
declare type Hashes = Array<string>

declare type TransactionFromBlockExplorer = {|
  +hash: Hash,
  +to: string,
  +from: string,
  +value: string,
  +gasUsed: string,
  +isError: string,
  +blockHash: Hash,
  +gasPrice: string,
  +timeStamp: string,
  +blockNumber: string,
  +contractAddress: string,
|}

/**
 * status of transaction
 * 0 - fail
 * 1 - success
 */
declare type TransactionStatus = 0 | 1

/**
 * type of event
 * 0 - ETH Transaction
 * 1 - ERC20 Transfer
 * 2 - JNT Mint/Burn
 */
declare type TransactionEventType = 0 | 1 | 2

declare type TransactionData = {|
  +gasPrice: number,
|}

declare type TransactionBlockData = {|
  +minedAt: number,
|}

declare type TransactionReceiptData = {|
  +gasUsed: number,
  +status: TransactionStatus,
|}

declare type Transaction = {|
  +data: ?TransactionData,
  +blockData: ?TransactionBlockData,
  +receiptData: ?TransactionReceiptData,
  +hash: Hash,
  +to: Address,
  +from: Address,
  +blockHash: ?Hash,
  +contractAddress: ?Address,
  +amount: number,
  +createdAt: number,
  +blockNumber: ?number,
  +eventType: TransactionEventType,
  +isRemoved: boolean,
|}

declare type TransactionWithAssetAddress = {|
  +data: ?TransactionData,
  +blockData: ?TransactionBlockData,
  +receiptData: ?TransactionReceiptData,
  +hash: Hash,
  +to: Address,
  +from: Address,
  +blockHash: ?Hash,
  +contractAddress: ?Address,
  +assetAddress: AssetAddress,
  +amount: number,
  +createdAt: number,
  +blockNumber: ?number,
  +eventType: TransactionEventType,
  +isRemoved: boolean,
|}

declare type Transactions = {
  [Hash]: ?Transaction,
}

declare type TransactionsByOwner = {
  [AssetAddress]: ?Transactions,
}

declare type TransactionsByNetworkId = {
  [OwnerAddress]: ?TransactionsByOwner,
}

declare type TransactionsItems = {
  [NetworkId]: ?TransactionsByNetworkId,
}

declare type TransactionsPersist = {|
  +items: TransactionsItems,
|}

declare type TransactionsState = {|
  +persist: TransactionsPersist,
  +searchQuery: string,
  +isSyncing: boolean,
  +isOnlyPending: boolean,
  +isBlockExplorerError: boolean,
|}
