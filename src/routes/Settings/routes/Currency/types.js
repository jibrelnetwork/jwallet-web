// @flow

export type CurrencyFormFieldValues = {|
  +currencyCode: CurrencyCode,
|}

export type CurrencyFormFieldErrors = {
  currencyCode?: ?string,
}
