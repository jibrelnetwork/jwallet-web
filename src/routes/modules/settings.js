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
  isPinCode: false,
  isExchangeService: false,
  isSignMessage: true,
  isCheckingSignature: true,
}

const actionsMap = {
  [INIT]: (state: SettingsState): SettingsState => state,
}

function handleAction(
  { type }: SettingsAction,
  state: SettingsState = initialState
): SettingsState {
  return typeof actionsMap[type] === 'function' ? actionsMap[type](state) : state
}

const settings = (
  state: SettingsState = initialState,
  action: SettingsAction,
): SettingsState => handleAction(action, state)

export default settings
