// @flow

import gtm from 'services/gtm'

/**
 * Funds
 */
import * as receiveFunds from 'routes/Funds/routes/Receive/modules/receiveFunds'
import * as sendFunds from 'routes/Funds/routes/Send/modules/sendFunds'

/**
 * Custom Assets
 */
import * as customAsset from 'routes/CustomAsset/modules/customAsset'

/**
 * Wallets
 */
/*
import * as wallets from 'routes/Wallets/modules/wallets'
import * as createWallet from 'routes/Wallets/routes/Create/modules/createWallet'
*/
import * as importWallet from 'routes/Wallets/routes/Import/modules/importWallet'
import * as editWallet from 'routes/Wallets/routes/Edit/modules/editWallet'
import * as backupWallet from 'routes/Wallets/routes/Backup/modules/backupWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangePassword/modules/changeWalletPassword' // eslint-disable-line max-len
import * as removeWallet from 'routes/Wallets/routes/Remove/modules/removeWallet'

export const pushEvent = () => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  switch (type) {
    case sendFunds.SEND_SUCCESS: {
      gtm.pushSendFunds()
      break
    }

    case receiveFunds.GENERATE_SUCCESS: {
      gtm.pushReceiveFunds('QRCodeGenerate', payload.walletType)
      break
    }

    case customAsset.ADD_SUCCESS: {
      gtm.pushAddCustomAsset()
      break
    }

    /*
    case wallets.SET_ACTIVE_SUCCESS: {
      gtm.pushSetActiveWallet(payload.walletType)
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
    */

    case importWallet.SET_CURRENT_STEP: {
      switch (payload.currentStep) {
        case importWallet.STEPS.PASSWORD: {
          gtm.pushImportWallet('SetData', payload.walletType)
          break
        }

        case importWallet.STEPS.ASSETS: {
          gtm.pushImportWallet('Success', payload.walletType)
          break
        }

        default: break
      }

      break
    }

    case editWallet.SET_CURRENT_STEP: {
      if (payload.currentStep === editWallet.STEPS.PASSWORD) {
        gtm.pushEditWallet('SetData', payload.walletType)
      }

      break
    }

    case editWallet.EDIT_SUCCESS: {
      gtm.pushEditWallet('Success', payload.walletType)
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
