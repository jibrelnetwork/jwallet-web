// @flow

export type CurrencyFormFieldValues = {|
  +fiatCurrency: FiatCurrency,
|}

export type CurrencyFormFieldErrors = {
  +fiatCurrency?: ?string,
}
