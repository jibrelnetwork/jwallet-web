// @flow

declare type SettingsPersist = {|
  +fiatCurrency: FiatCurrency,
  +systemLanguageCode: LanguageCode,
  +hasPinCode: boolean,
|}

declare type SettingsState = {|
  +persist: SettingsPersist,
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
