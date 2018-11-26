// @flow

import BigNumber from 'bignumber.js'

declare type Index = number
declare type Decimals = number
declare type Bignumber = typeof BigNumber

declare type Address = string
declare type OwnerAddress = Address
declare type Addresses = Array<Address>
declare type EthereumAddress = 'Ethereum'
declare type AssetAddress = Address | EthereumAddress
declare type AssetAddresses = Array<AssetAddress>
declare type AddressNames = { [Address]: string }

declare type LanguageCode = 'en' | 'ko' | 'zh' | 'ja'

declare type FormFields = { [string]: ?string }

declare type WorkerError = {|
  +message: string,
|}

declare type HMR = {|
  +accept: (string, (void) => void) => void,
|}

declare type SetFieldFunction<T> = ($Keys<T>, string) => void

declare type OwnPropsEmpty = {||}

declare function i18n(path: string): string

declare type OwnPropsEmpty = {||}

/**
 * Errors
 */
declare type InvalidFieldError = {
  +fieldName: string,
  +message: string,
}
