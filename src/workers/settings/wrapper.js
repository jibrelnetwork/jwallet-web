// @flow

import { type Store } from 'redux'

import { type AppAction } from 'store/modules'

// eslint-disable-next-line import/default
import SettingsWorker from './worker.js'

// $FlowFixMe
const settingsWorker = new SettingsWorker()

export function changePassword(state: AppState, passwordForm: PaymentPasswordForm) {
  settingsWorker.postMessage({
    state,
    passwordForm,
  })
}

export function run(store: Store<AppState, AppAction>) {
  settingsWorker.onmessage = function settingsWorkerOnMessage(msg) {
    store.dispatch(msg.data)
  }
}
