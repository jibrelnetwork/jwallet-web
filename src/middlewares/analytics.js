// @flow

import gtm from 'services/gtm'
import * as createWallet from 'routes/Wallets/routes/CreateWallet/modules/createWallet'
import * as backupWallet from 'routes/Wallets/routes/BackupWallet/modules/backupWallet'
import * as removeWallet from 'routes/Wallets/routes/RemoveWallet/modules/removeWallet'

// eslint-disable-next-line max-len
import * as changeWalletPassword from 'routes/Wallets/routes/ChangeWalletPassword/modules/changeWalletPassword'

export const pushEvent = () => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  switch (type) {
    case backupWallet.BACKUP_SUCCESS: {
      gtm.pushBackupWallet(payload.walletType)
      break
    }

    case changeWalletPassword.CHANGE_PASSWORD_SUCCESS: {
      gtm.pushChangeWalletPassword(payload.walletType)
      break
    }

    case removeWallet.REMOVE_SUCCESS: {
      gtm.pushRemoveWallet(payload.walletType)
      break
    }

    case createWallet.SET_CURRENT_STEP: {
      switch (payload.currentStep) {
        case createWallet.STEPS.CONFIRM: {
          gtm.pushCreateWallet('SaveMnemonic')
          break
        }

        case createWallet.STEPS.PASSWORD: {
          gtm.pushCreateWallet('ConfirmMnemonic')
          break
        }

        case createWallet.STEPS.ASSETS: {
          gtm.pushCreateWallet('Success')
          break
        }

        default: break
      }

      break
    }

    default: break
  }

  return next(action)
}
