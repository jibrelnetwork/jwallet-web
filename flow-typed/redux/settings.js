// @flow

// @TODO We are saving the temporary data for Settings page here,
//  structure will change when modules will added.
declare type SettingsState = {|
  +localCurrencyCode: CurrencyCode, // USD
  +defaultGasPrice: BalanceString,
  +systemLanguageCode: LanguageCode, // en
  +hasPinCode: boolean, // false
|}
