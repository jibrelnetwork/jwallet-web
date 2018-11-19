// @flow

declare type Hash = string
declare type Hashes = Array<string>

/**
 * status of transaction
 * 0x0 - fail
 * 0x1 - success
 */
declare type TransactionStatus = '0x0' | '0x1'

/**
 * type of event
 * 0 - ETH Transaction
 * 1 - ERC20 Transfer
 * 2 - JNT Mint/Burn
 */
declare type TransactionEventType = 0 | 1 | 2

declare type Transaction = {
  +to: Address,
  +from: Address,
  +blockHash: ?Hash,
  +contractAddress?: Address,
  +amount: number,
  +gasUsed?: number,
  +gasPrice: number,
  +timestamp?: number,
  +blockNumber: ?number,
  +status?: TransactionStatus,
  +eventType: TransactionEventType,
  +isRemoved?: boolean,
}

declare type Transactions = {
  [Hash]: Transaction,
}

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

declare type TransactionsState = {
  +persist: {|
    +items: {
      [NetworkIdOptional]: {
        [OwnerAddress]: {
          [AssetAddress]: Transactions,
        },
      },
    },
  |},
  +isSyncing: boolean,
  +isBlockExplorerError: boolean,
}
