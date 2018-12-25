// @flow

declare type Index = number

declare type Decimals = number
declare type BalanceString = string

declare type Address = string
declare type OwnerAddress = Address
declare type EthereumAddress = 'Ethereum'
declare type AssetAddress = Address | EthereumAddress

declare type AddressNames = { [Address]: ?string }

declare type CurrencyCode = 'USD' | 'EUR'
declare type SortDirection = 'asc' | 'desc'
declare type LanguageCode = 'en' | 'ko' | 'zh' | 'ja'

declare type FormFields = { [string]: ?string }
declare type SetFieldFunction<T> = ($Keys<T>, string) => void

declare type OwnPropsEmpty = {||}

declare function i18n(path: string): string

declare type WorkerError = {|
  +message: string,
|}

declare type HMR = {|
  +accept: (string, (void) => void) => void,
|}

/**
 * Errors
 */
declare type InvalidFieldError = {
  +fieldName: string,
  +message: string,
}
