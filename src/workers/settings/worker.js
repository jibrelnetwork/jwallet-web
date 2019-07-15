// @flow

import { i18n } from 'i18n/lingui'

import {
  validationPasswordForm,
  changePaymentPasswordPending,
  type SettingsAction,
} from 'store/modules/settings'

type SettingsWorkerMessage = {|
  +data: SettingsAction,
|}

export type SettingsWorkerInstance = {|
  onmessage: (SettingsWorkerMessage) => void,
  +postMessage: (SettingsAction) => void,
  window: SettingsWorkerInstance,
|}

/* eslint-disable-next-line no-restricted-globals */
const settingsWorker: SettingsWorkerInstance = self

// eslint-disable-next-line fp/no-mutation
settingsWorker.window = settingsWorker

settingsWorker.onmessage = (): void => {
  try {
    //
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)

    settingsWorker.postMessage(validationPasswordForm({
      passwordOld: i18n._(
        'common.settings.worker.error.passwordInvalid',
        null,
        { defaults: 'Password is invalid' },
      ),
    }))
  } finally {
    settingsWorker.postMessage(changePaymentPasswordPending(false))
  }
}
