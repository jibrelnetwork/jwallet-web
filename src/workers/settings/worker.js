// @flow

import type { SettingsAction } from 'routes/Settings/modules/settings'
import {
  changePaymentPasswordPending,
} from 'routes/Settings/modules/settings'
import { isValidatePassword } from 'utils/password'
import { reEncryptWallet, getPasswordOptions, initPassword } from 'utils/encryption'
import * as walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'

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
  const passwordOptionsNew = getPasswordOptions({})

  if (isValidatePassword(state, passwordForm.passwordOld)) {
    const { items } = state.wallets.persist
    const reEncryptedWallets = items.map(wallet =>
      reEncryptWallet(
        wallet,
        passwordForm.passwordOld,
        passwordForm.passwordNew,
        passwordOptionsNew,
      )
    )
    settingsWorker.postMessage(walletsCreate.createSuccess({
      passwordOptions: passwordOptionsNew,
      mnemonicOptions: state.wallets.persist.mnemonicOptions,
      testPasswordData: initPassword(passwordForm.passwordNew, passwordOptionsNew),
      items: reEncryptedWallets,
    }))
  }
  settingsWorker.postMessage(changePaymentPasswordPending(false))
}
