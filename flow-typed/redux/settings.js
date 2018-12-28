// @flow

declare type SettingsState = {|
  +localCurrencyCode: CurrencyCode,
  +defaultGasPrice: BalanceString,
  +systemLanguageCode: LanguageCode,
  +hasPinCode: boolean,
|}

declare type PaymentPasswordForm = {|
  passwordOld?: string,
  passwordNew?: string,
  passwordNewConfirm?: string,
  passwordHint?: string,
|}
