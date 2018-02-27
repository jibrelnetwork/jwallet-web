// @flow

import gtm from 'services/gtm'
import * as createWallet from 'routes/Wallets/routes/CreateWallet/modules/createWallet'
import * as importWallet from 'routes/Wallets/routes/ImportWallet/modules/importWallet'
import * as backupWallet from 'routes/Wallets/routes/BackupWallet/modules/backupWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangeWalletPassword/modules/changeWalletPassword' // eslint-disable-line max-len
import * as removeWallet from 'routes/Wallets/routes/RemoveWallet/modules/removeWallet'

export const pushEvent = () => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  switch (type) {
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

    case importWallet.SET_CURRENT_STEP: {
      switch (payload.currentStep) {
        case importWallet.STEPS.PASSWORD: {
          gtm.pushImportWallet('SetData', payload.customType)
          break
        }

        case importWallet.STEPS.ASSETS: {
          gtm.pushImportWallet('Success', payload.customType)
          break
        }

        default: break
      }

      break
    }

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

    default: break
  }

  return next(action)
}
