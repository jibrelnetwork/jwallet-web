// @flow

declare type SettingsState = {|
  +localCurrencyCode: CurrencyCode,
  +defaultGasPrice: BalanceString,
  +systemLanguageCode: LanguageCode,
  +hasPinCode: boolean,
  +passwordForm: {
    values: PaymentPasswordForm,
    messages: PaymentPasswordForm,
  },
|}

declare type PaymentPasswordForm = {|
  passwordOld?: string,
  passwordNew?: string,
  passwordNewConfirm?: string,
  passwordHint?: string,
|}
