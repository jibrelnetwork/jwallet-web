// @flow

import type { SettingsAction } from 'routes/Settings/modules/settings'

// eslint-disable-next-line import/default
import SettingsWorker from './worker.js'

// $FlowFixMe
const settingsWorker = new SettingsWorker()

export function changePassword(state: AppState, passwordForm: PaymentPasswordForm) {
  settingsWorker.postMessage({ state, passwordForm })
}

export function run(store: { dispatch: (SettingsAction) => void }) {
  settingsWorker.onmessage = function settingsWorkerOnMessage(msg) {
    store.dispatch(msg.data)
  }
}
