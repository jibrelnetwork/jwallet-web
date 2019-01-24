// @flow

import type { SettingsAction } from 'routes/Settings/modules/settings'
import {
  changePaymentPasswordPending,
  validationPasswordForm,
} from 'routes/Settings/modules/settings'
import * as wallets from 'routes/Wallets/modules/wallets'

import { isValidatePassword } from 'utils/password'
import { reEncryptWallet, getPasswordOptions, initPassword } from 'utils/encryption'

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

settingsWorker.onmessage = (msg: SettingsWorkerMessage): void => {
  const { state, passwordForm } = msg.data
  const passwordOptionsNew = getPasswordOptions({
    passwordHint: passwordForm.passwordHint,
  })

  if (isValidatePassword(state, passwordForm.passwordOld)) {
    const { items } = state.wallets.persist
    try {
      const reEncryptedWallets = items.map(wallet =>
        reEncryptWallet(
          wallet,
          passwordForm.passwordOld,
          passwordForm.passwordNew,
          passwordOptionsNew,
        )
      )
      settingsWorker.postMessage(wallets.setWallets({
        passwordOptions: passwordOptionsNew,
        mnemonicOptions: state.wallets.persist.mnemonicOptions,
        testPasswordData: initPassword(passwordForm.passwordNew, passwordOptionsNew),
        items: reEncryptedWallets,
      }))
    } catch (e) {
      console.error(e)
    }
  } else {
    settingsWorker.postMessage(validationPasswordForm({
      passwordOld: 'Password is invalid',
    }))
  }
  settingsWorker.postMessage(changePaymentPasswordPending(false))
}
