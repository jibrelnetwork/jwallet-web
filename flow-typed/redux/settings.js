// @flow strict

declare type SettingsPersist = {|
  +language: LanguageCode,
  +fiatCurrency: FiatCurrency,
  +isDeveloperMode: boolean,
|}

declare type SettingsState = {|
  +persist: SettingsPersist,
|}
