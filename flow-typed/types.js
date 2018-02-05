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
  isCurrent: boolean,
  isCustom: boolean,
  isActive: boolean,
}

declare type DigitalAssets = Array<DigitalAsset>

declare type CustomAssetData = {
  address: Address,
  symbol: string,
  name: string,
  decimals: string,
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
  recipient: Address,
  password: string,
  amount: string,
  symbol: string,
  gas?: string,
  gasPrice?: string,
  nonce?: string,
}
