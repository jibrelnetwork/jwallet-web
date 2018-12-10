// @flow

export const INIT = '@@settings/INIT'

export function init() {
  return {
    type: INIT,
  }
}

export type SettingsAction =
  ExtractReturn<typeof init>

const initialState: SettingsState = {
  localCurrencyCode: 'USD',
  defaultGasPrice: '30000',
  systemLanguageCode: 'en',
  hasPinCode: false,
}

const settings = (
  state: SettingsState = initialState,
  action: SettingsAction,
): SettingsState => {
  switch (action.type) {
    case INIT:
      return state
    default:
      return state
  }
}

export default settings
