// @flow

// @TODO We are saving the temporary data for Settings page here,
//  structure will change when modules will added.
declare type SettingsState = {|
  +localCurrencyCode: string, // USD
  +defaultGasPrice: string, // 300000 TODO !BIGNUMBERSTRING
  +systemLanguageCode: string, // en
  +isPinCode: boolean, // false
  +isExchangeService: boolean, // false
  +isSignMessage: boolean, // true
  +isCheckingSignature: boolean, // true
|}
