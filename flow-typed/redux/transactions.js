// @flow

declare type Hash = string
declare type TransactionId = string

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

declare type ERC20EventName = 'Transfer'
declare type JNTEventName = 'MintEvent' | 'BurnEvent'
declare type SmartContractEventName = ERC20EventName | JNTEventName

declare type SmartContractEventProps = {|
  +options: SmartContractEventOptions,
  +rpcaddr: string,
  +event: SmartContractEventName,
  +contractAddress: AssetAddress,
  +rpcport: number,
  +ssl: boolean,
|}

declare type SmartContractEventFilter = {|
  +to?: OwnerAddress,
  +from?: OwnerAddress,
  +owner?: OwnerAddress,
|}

declare type SmartContractEventOptions = {|
  +filter: SmartContractEventFilter,
  +toBlock: number,
  +fromBlock: number,
|}

declare type JNTEventArgs = {|
  +owner: string,
  +value: string,
|}

declare type TransferEventArgs = {|
  +to: string,
  +from: string,
  +value: string,
|}

declare type TransferEventFromEthereumNode = {|
  +args: TransferEventArgs,
  +event: string,
  +address: string,
  +blockHash: ?string,
  +transactionHash: string,
  +logIndex: number,
  +blockNumber: ?number,
  +removed: boolean,
|}

declare type JNTEventFromEthereumNode = {|
  +args: JNTEventArgs,
  +event: string,
  +address: string,
  +blockHash: ?string,
  +transactionHash: string,
  +logIndex: number,
  +blockNumber: ?number,
  +removed: boolean,
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
  +gasPrice: string,
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
  +amount: string,
  +blockHash: ?Hash,
  +to: ?OwnerAddress,
  +from: OwnerAddress,
  +contractAddress: ?OwnerAddress,
  +createdAt: ?number,
  +blockNumber: ?number,
  +eventType: TransactionEventType,
  +isRemoved: boolean,
|}

declare type TransactionWithPrimaryKeys = {|
  +keys: {|
    +id: TransactionId,
    +blockNumber: BlockNumber,
    +assetAddress: AssetAddress,
  |},
  +data: ?TransactionData,
  +blockData: ?TransactionBlockData,
  +receiptData: ?TransactionReceiptData,
  +hash: Hash,
  +amount: string,
  +blockHash: ?Hash,
  +to: ?OwnerAddress,
  +from: OwnerAddress,
  +contractAddress: ?OwnerAddress,
  +createdAt: ?number,
  +blockNumber: ?number,
  +eventType: TransactionEventType,
  +isRemoved: boolean,
|}

declare type Transactions = {
  [TransactionId]: ?Transaction,
}

declare type TransactionsByBlockNumber = {|
  +items?: Transactions,
  +isError?: boolean,
|}

declare type TransactionsByAssetAddress = {
  [BlockNumber]: ?TransactionsByBlockNumber,
}

declare type TransactionsByOwner = {
  [AssetAddress]: ?TransactionsByAssetAddress,
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
  +isOnlyPending: boolean,
  +isConnectionError: boolean,
|}
