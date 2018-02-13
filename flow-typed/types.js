import type { Saga } from 'redux-saga'

/**
 * General
 */

declare type Index = number
declare type Address = string
declare type Addresses = Array<Address>
declare type Bignumber = any

/**
 * Digital Assets
 */

declare type DigitalAsset = {
  address: Address,
  symbol: string,
  name: string,
  decimals: number,
  isAuthRequired: boolean,
  isLicensed: boolean,
  isCustom: boolean,
  isActive: boolean,
  isCurrent?: boolean,
}

declare type DigitalAssets = Array<DigitalAsset>

declare type CustomAssetData = {
  address: Address,
  symbol: string,
  name: string,
  decimals: string,
}

declare type DigitalAssetsData = {
  items: DigitalAssets,
  foundItemsSymbols: Array<string>,
  balances: any,
  sortField: string,
  sortDirection: string,
  searchQuery: string,
  currentAddress: Address,
  isLoading: boolean,
  isActiveAll: boolean,
}

/**
 * Keystore
 */

declare type AccountId = string
declare type Password = string

declare type Account = {
  encrypted: {
    privateKey: string,
    mnemonic: string,
  },
  id: string,
  type: string,
  accountName: string,
  isReadOnly: boolean,
  isActive: boolean,
  derivationPath?: string,
  bip32XPublicKey?: string,
  addressIndex?: Index,
}

declare type Accounts = Array<Account>

declare type NewAccountData = {
  type: string,
  isReadOnly: boolean,
  mnemonic?: string,
  bip32XPublicKey?: string,
  privateKey?: string,
  address?: string,
}

declare type KeystoreData = {
  currentAccount: Account,
  newAccountNameData: {
    accountId: AccountId,
    newAccountName: string,
  },
  addressesFromMnemonic: {
    items: Addresses,
    currentIteration: number,
  },
  accounts: Accounts,
  sortField: string,
  sortDirection: string,
  isLoading: boolean,
  isCreating: boolean,
  isOpen: boolean,
}

/**
 * Networks
 */

declare type Network = {
  title: string,
  rpcaddr: string,
  rpcport: string,
  id: Index,
  ssl: boolean,
  isCustom: boolean,
}

declare type Networks = Array<Network>

/**
 * Transactions
 */

declare type Hash = string

declare type Transaction = {
  type: string,
  status: string,
  transactionHash: Hash,
  date: string,
  contractAddress: Address,
  fee: number,
  amount: number,
  timestamp: number,
  from?: Address,
  to?: Address,
  address?: Address,
  isJNT?: boolean,
}

declare type Transactions = Array<Transaction>

/**
 * Funds
 */

declare type SendFundsData = {
  invalidFields: any,
  alert: string,
  amount: string,
  password: string,
  currentStep: number,
  gas?: string,
  gasPrice?: string,
  nonce?: string,
  /**
   * symbol & recipient should be replaced by assetAddress & recipientAdress
   */
  symbol: string,
  recipient: Address,
}

declare type ReceiveFundsData = {
  invalidFields: any,
  amount: string,
  /**
   * symbol should be replaced by assetAddress
   */
  symbol: string,
}

/**
 * Entire state
 */

declare type State = {
  currencies: DigitalAssetsData,
  keystore: KeystoreData,
  receiveFunds: ReceiveFundsData,
  sendFunds: SendFundsData,
}

/**
 * Errors
 */

declare type InvalidFieldError = {
  fieldName: string,
  message: string,
}
