// @flow

export function selectSettings(state: AppState): SettingsState {
  return state.settings
}

export function selectSettingsPersist(state: AppState): SettingsPersist {
  const settings: SettingsState = selectSettings(state)

  return settings.persist
}

export function selectSettingsFiatCurrency(state: AppState): FiatCurrency {
  const settingsPersist: SettingsPersist = selectSettingsPersist(state)

  return settingsPersist.fiatCurrency
}
