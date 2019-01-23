// @flow

declare type SettingsState = {|
  +localCurrencyCode: CurrencyCode,
  +defaultGasPrice: BalanceString,
  +systemLanguageCode: LanguageCode,
  +hasPinCode: boolean,
  +passwordForm: {
    isLoading: boolean,
    messages: PaymentPasswordForm,
  },
|}

declare type PaymentPasswordForm = {|
  passwordOld?: string,
  passwordNew?: string,
  passwordNewConfirm?: string,
  passwordHint?: string,
|}
