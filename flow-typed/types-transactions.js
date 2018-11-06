// @flow

/**
 * Transactions
 */
declare type Hash = string
declare type Hashes = Array<string>

declare type Transaction = {
  +type: string,
  +status: string,
  +transactionHash: Hash,
  +date: string,
  +contractAddress: Address,
  +fee: number,
  +amount: number,
  +timestamp: number,
  +from?: Address,
  +to?: Address,
  +address?: Address,
  +isJNT?: boolean,
}

declare type Transactions = Array<Transaction>
declare type _TransactionsByPeriodKey = ?string
declare type TransactionsByPeriod = { [_TransactionsByPeriodKey]: ?Transactions }

declare type TransactionsData = {
  +items: Transactions,
  +foundTransactions: Hashes,
  +invalidFields: FormFields,
  +searchQuery: string,
  +isLoading: boolean,
  +isBlockExplorerError: boolean,
  +activeTxHash: ?Hash,
}
