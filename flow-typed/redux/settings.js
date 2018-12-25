// @flow

declare type SettingsState = {|
  +localCurrencyCode: CurrencyCode,
  +defaultGasPrice: BalanceString,
  +systemLanguageCode: LanguageCode,
  +hasPinCode: boolean,
|}
