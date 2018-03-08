// @flow

import { push } from 'react-router-redux'

import isMnemonicType from 'utils/isMnemonicType'

/**
 * Funds
 */
import * as receiveFunds from 'routes/Funds/routes/ReceiveFunds/modules/receiveFunds'
import * as sendFunds from 'routes/Funds/routes/SendFunds/modules/sendFunds'

/**
 * Digital Assets
 */
import * as addCustomAsset from 'routes/AddCustomAsset/modules/addCustomAsset'

/**
 * Wallets
 */
import * as wallets from 'routes/Wallets/modules/wallets'
import * as editWallet from 'routes/Wallets/routes/EditWallet/modules/editWallet'
import * as backupWallet from 'routes/Wallets/routes/BackupWallet/modules/backupWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangeWalletPassword/modules/changeWalletPassword' // eslint-disable-line max-len
import * as removeWallet from 'routes/Wallets/routes/RemoveWallet/modules/removeWallet'

export const redirect = (store: Store) => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  switch (type) {
    /**
     * Funds
     */
    case receiveFunds.CLOSE:
    case sendFunds.CLOSE:
    case sendFunds.SEND_SUCCESS: {
      store.dispatch(push('/'))
      break
    }

    /**
     * Digital Assets
     */
    case addCustomAsset.ADD_SUCCESS: {
      store.dispatch(push('/'))
      break
    }

    /**
     * Wallets
     */
    case editWallet.OPEN:
    case backupWallet.OPEN: {
      try {
        const walletId: ?WalletId = store.getState().wallets.activeWalletId

        if (!walletId) {
          store.dispatch(push('/wallets'))
        }
      } catch (err) {
        store.dispatch(push('/wallets'))
      }

      break
    }

    case editWallet.EDIT_SUCCESS:
    case backupWallet.BACKUP_SUCCESS:
    case changeWalletPassword.CLOSE:
    case removeWallet.CLOSE: {
      store.dispatch(push('/'))
      break
    }

    case wallets.SET_ACTIVE_SUCCESS: {
      if (isMnemonicType(payload.walletType)) {
        store.dispatch(push('/wallets/addresses'))
      } else if (payload.walletAction) {
        store.dispatch(push(`/wallets/${payload.walletAction}`))
      } else {
        store.dispatch(push('/'))
      }

      break
    }

    case removeWallet.REMOVE_SUCCESS: {
      store.dispatch(push('/wallets/start'))
      break
    }

    default: break
  }

  return next(action)
}
