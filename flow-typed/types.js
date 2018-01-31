import type { Saga } from 'redux-saga'

/**
 * General
 */

declare type Index = number
declare type Address = string
declare type Addresses = Array<Address>

/**
 * Digital Assets
 */

declare type DigitalAsset = {
  address: string,
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

declare type TokenData = {
  address: string,
  symbol: string,
  name: string,
  decimals: string,
}

/**
 * Keystore
 */

declare type AccountId = string
declare type Password = string

declare type EncryptedAccountData = {
  privateKey: string,
  mnemonic: string,
}

declare type Account = {
  encrypted: EncryptedAccountData,
  id: string,
  type: string,
  accountName: string,
  derivationPath?: string,
  bip32XPublicKey?: string,
  addressIndex?: number,
  isReadOnly: boolean,
  isActive: boolean,
}
