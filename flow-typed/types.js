// @flow

declare type Index = number
declare type EthereumAddress = 'Ethereum'
declare type Address = string | EthereumAddress
declare type Addresses = Array<Address>
declare type Bignumber = any
declare type Decimals = number
declare type Balances = { [Address]: number }
declare type AddressNames = { [Address]: string }
declare type AddressBalancePairs = Array<[Address, number]>
declare type LanguageCode = 'en' | 'ko' | 'zh' | 'ja'

declare type FormFields = { [string]: ?string }

declare type DerivationPath = {
  +path: string,
  +description: string,
}

declare type DerivationPaths = Array<DerivationPath>

declare type WorkerError = {|
  +message: string,
|}

declare type HMR = {|
  +accept: (string, (void) => void) => void,
|}

declare type SetFieldFunction<T> = ($Keys<T>, string) => void

declare function i18n(path: string): string

declare type OwnPropsEmpty = {||}

/**
 * Errors
 */
declare type InvalidFieldError = {
  +fieldName: string,
  +message: string,
}
