// @flow

import { isEmpty } from 'ramda'
import { push } from 'react-router-redux'

import keystore from 'services/keystore'
import isMnemonicType from 'utils/isMnemonicType'

/**
 * Wallets
 */
import * as wallets from 'routes/Wallets/modules/wallets'
import * as start from 'routes/Wallets/routes/Start/modules/start'
import * as mnemonicAddresses from 'routes/Wallets/routes/Addresses/modules/mnemonicAddresses'
import * as editWallet from 'routes/Wallets/routes/EditWallet/modules/editWallet'
import * as backupWallet from 'routes/Wallets/routes/BackupWallet/modules/backupWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangeWalletPassword/modules/changeWalletPassword' // eslint-disable-line max-len
import * as removeWallet from 'routes/Wallets/routes/RemoveWallet/modules/removeWallet'

/**
 * Digital Assets
 */
import * as addCustomAsset from 'routes/AddCustomAsset/modules/addCustomAsset'
import * as digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'

/**
 * Transactions
 */
import * as transactions from 'routes/Transactions/modules/transactions'

/**
 * Funds
 */
import * as sendFunds from 'routes/Funds/routes/SendFunds/modules/sendFunds'

export const redirect = (store: Store) => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action
  const goToLocation = (location: string): Next => store.dispatch(push(location))

  const goToWalletsIfNoActive = () => {
    try {
      const walletId: ?WalletId = store.getState().wallets.activeWalletId

      if (!walletId) {
        goToLocation('/wallets')
      }
    } catch (err) {
      goToLocation('/wallets')
    }
  }

  switch (type) {
    /**
     * Wallets
     */
    case wallets.OPEN: {
      try {
        const walletsItems: Wallets = store.getState().wallets.items

        if (isEmpty(walletsItems)) {
          goToLocation('/wallets/start')
        }
      } catch (err) {
        goToLocation('/wallets/start')
      }

      break
    }

    case start.OPEN: {
      try {
        const walletsItems: Wallets = store.getState().wallets.items

        if (!isEmpty(walletsItems)) {
          goToLocation('/wallets')
        }
      } catch (err) {
        //
      }

      break
    }

    case mnemonicAddresses.OPEN: {
      try {
        const walletId: ?WalletId = store.getState().wallets.activeWalletId

        if (!walletId) {
          goToLocation('/wallets')
        } else {
          const walletType: WalletType = keystore.getWallet(walletId).type

          if (!isMnemonicType(walletType)) {
            goToLocation('/wallets')
          }
        }
      } catch (err) {
        goToLocation('/wallets')
      }

      break
    }

    case editWallet.OPEN:
    case backupWallet.OPEN:
    case removeWallet.OPEN: {
      goToWalletsIfNoActive()
      break
    }

    case changeWalletPassword.OPEN: {
      try {
        const walletId: ?WalletId = store.getState().wallets.activeWalletId

        if (!walletId) {
          goToLocation('/wallets')
        } else {
          const { isReadOnly }: Wallet = keystore.getWallet(walletId)

          if (isReadOnly) {
            goToLocation('/wallets')
          }
        }
      } catch (err) {
        goToLocation('/wallets')
      }

      break
    }

    case wallets.SET_ACTIVE_SUCCESS: {
      if (isMnemonicType(payload.walletType)) {
        goToLocation('/wallets/addresses')
      } else if (payload.walletAction) {
        goToLocation(`/wallets/${payload.walletAction}`)
      } else {
        goToLocation('/')
      }

      break
    }

    case mnemonicAddresses.SET_ACTIVE_SUCCESS: {
      const { walletAction }: WalletsData = store.getState().wallets

      if (walletAction) {
        goToLocation(`/wallets/${walletAction}`)
      } else {
        goToLocation('/')
      }

      break
    }

    case editWallet.EDIT_SUCCESS:
    case backupWallet.BACKUP_SUCCESS:
    case changeWalletPassword.CHANGE_PASSWORD_SUCCESS: {
      goToLocation('/')
      break
    }

    case removeWallet.REMOVE_SUCCESS: {
      goToLocation('/wallets')
      break
    }

    /**
     * Digital Assets
     */
    case digitalAssets.SET_CURRENT: {
      const locationPath: string = store.getState().router.locationBeforeTransitions.pathname
      const isTransactiosRoute = (locationPath.indexOf('/transactions/') !== 0)

      if (payload.currentAddress && isTransactiosRoute) {
        goToLocation('/transactions/all')
      }

      break
    }

    case addCustomAsset.ADD_SUCCESS: {
      goToLocation('/')
      break
    }

    /**
     * Transactions
     */
    case transactions.OPEN: {
      goToWalletsIfNoActive()
      break
    }

    /**
     * Funds
     */
    case sendFunds.OPEN: {
      try {
        const walletId: ?WalletId = store.getState().wallets.activeWalletId

        if (!walletId) {
          goToLocation('/wallets')
        } else {
          const { isReadOnly }: Wallet = keystore.getWallet(walletId)

          if (isReadOnly) {
            goToLocation('/')
          }
        }
      } catch (err) {
        goToLocation('/')
      }

      break
    }

    case sendFunds.SEND_SUCCESS: {
      goToLocation('/')
      break
    }

    default: break
  }

  return next(action)
}
