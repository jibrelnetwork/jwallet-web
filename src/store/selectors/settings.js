// @flow strict

export function selectSettings(state: AppState): SettingsState {
  return state.settings
}

export function selectSettingsPersist(state: AppState): SettingsPersist {
  const settings: SettingsState = selectSettings(state)

  return settings.persist
}

export function selectSettingsLanguage(state: AppState): LanguageCode {
  const { language }: SettingsPersist = selectSettingsPersist(state)

  return language
}

export function selectSettingsFiatCurrency(state: AppState): FiatCurrency {
  const { fiatCurrency }: SettingsPersist = selectSettingsPersist(state)

  return fiatCurrency
}

export function selectSettingsDeveloperMode(state: AppState): boolean {
  const { isDeveloperMode }: SettingsPersist = selectSettingsPersist(state)

  return isDeveloperMode
}
