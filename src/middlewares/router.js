// @flow

import { push } from 'react-router-redux'

import { getWallet, checkMnemonicType } from 'utils/wallets'

/**
 * Wallets
 */
import * as wallets from 'routes/Wallets/modules/wallets'
import * as start from 'routes/Wallets/routes/Start/modules/start'
import * as walletsRename from 'routes/Wallets/routes/Rename/modules/walletsRename'
import * as walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'
import * as walletsDelete from 'routes/Wallets/routes/Delete/modules/walletsDelete'
import * as walletsAddresses from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'

/*
import * as backupWallet from 'routes/Wallets/routes/Backup/modules/backupWallet'
import * as removeWallet from 'routes/Wallets/routes/Remove/modules/removeWallet'
import * as mnemonicAddresses from 'routes/Wallets/routes/Addresses/modules/mnemonicAddresses'
*/

/**
 * Digital Assets
import * as digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'
 */

/**
 * Custom Asset
import * as customAsset from 'routes/CustomAsset/modules/customAsset'
 */

/**
 * Transactions
import * as transactions from 'routes/Transactions/modules/transactions'
 */

/**
 * Funds
import * as sendFunds from 'routes/Funds/routes/Send/modules/sendFunds'
import * as receiveFunds from 'routes/Funds/routes/Receive/modules/receiveFunds'
 */

/* eslint-disable max-len */
import type { WalletsAction } from 'routes/Wallets/modules/wallets'
import type { WalletsStartAction } from 'routes/Wallets/routes/Start/modules/start'
import type { WalletsRenameAction } from 'routes/Wallets/routes/Rename/modules/walletsRename'
import type { WalletsBackupAction } from 'routes/Wallets/routes/Backup/modules/walletsBackup'
import type { WalletsDeleteAction } from 'routes/Wallets/routes/Delete/modules/walletsDelete'
import type { WalletsAddressesAction } from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'
/* eslint-enable max-len */

type MiddlewareAction =
  WalletsAction |
  WalletsStartAction |
  WalletsRenameAction |
  WalletsBackupAction |
  WalletsDeleteAction |
  WalletsAddressesAction

export const redirect = (store: Store) => (next: Next) => (action: MiddlewareAction) => {
  function goToLocation(location: string) {
    store.dispatch(push(location))
  }

  /*
  function getCurrentLocation(state: State): string {
    return state.router.locationBeforeTransitions.pathname
  }

  function goToWalletsIfNoActive() {
    try {
      const walletId: ?WalletId = store.getState().wallets.activeWalletId

      if (!walletId) {
        goToLocation('/wallets')
      }
    } catch (err) {
      goToLocation('/wallets')
    }
  }
  */

  switch (action.type) {
    /**
     * Wallets
     */
    case wallets.OPEN_VIEW: {
      const walletsState: WalletsState = store.getState().wallets
      const walletsItems: Wallets = walletsState.items

      if (!walletsItems.length) {
        goToLocation('/wallets/start')
      }

      break
    }

    case wallets.SET_ACTIVE_WALLET: {
      const { activeWalletId }: { activeWalletId: ?WalletId } = action.payload

      const walletsState: WalletsState = store.getState().wallets
      const walletsItems: Wallets = walletsState.items
      const wallet: ?Wallet = getWallet(walletsItems, activeWalletId)

      if (wallet && checkMnemonicType(wallet.type)) {
        goToLocation('/wallets/addresses')

        break
      }

      goToLocation('/wallets')

      break
    }

    case start.OPEN_VIEW: {
      const walletsState: WalletsState = store.getState().wallets
      const walletsItems: Wallets = walletsState.items

      if (walletsItems.length) {
        goToLocation('/wallets')
      }

      break
    }

    case walletsRename.OPEN_VIEW:
    case walletsDelete.OPEN_VIEW: {
      const { walletId } = action.payload
      const walletsState: WalletsState = store.getState().wallets
      const walletsItems: Wallets = walletsState.items
      const isFound: boolean = !!walletsItems.find((w: Wallet): boolean => (w.id === walletId))

      if (!isFound) {
        goToLocation('/wallets')
      }

      break
    }

    case walletsBackup.OPEN_VIEW: {
      const { walletId } = action.payload
      const walletsState: WalletsState = store.getState().wallets
      const walletsItems: Wallets = walletsState.items
      const foundWallet: ?Wallet = walletsItems.find((w: Wallet): boolean => (w.id === walletId))

      if (!foundWallet || foundWallet.isReadOnly) {
        goToLocation('/wallets')
      }

      break
    }

    case walletsRename.RENAME_SUCCESS:
    case walletsDelete.DELETE_SUCCESS: {
      goToLocation('/wallets')

      break
    }

    case walletsDelete.DELETE_ERROR: {
      goToLocation('/error')

      break
    }

    case walletsAddresses.SET_ACTIVE_SUCCESS: {
      goToLocation('/wallets')

      break
    }

    /*
    case mnemonicAddresses.OPEN: {
      try {
        const walletId: ?WalletId = store.getState().wallets.activeWalletId

        if (!walletId) {
          goToLocation('/wallets')
        } else {
          const walletType: WalletType = keystore.getWallet(walletId).type

          if (!checkMnemonicType(walletType)) {
            goToLocation('/wallets')
          }
        }
      } catch (err) {
        goToLocation('/wallets')
      }

      break
    }

    case backupWallet.OPEN: {
      goToWalletsIfNoActive()
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

    case backupWallet.BACKUP_SUCCESS: {
      goToLocation('/')
      break
    }
    */

    /**
     * Digital Assets
     */
    /*
    case digitalAssets.OPEN: {
      goToWalletsIfNoActive()
      break
    }

    case digitalAssets.SET_CURRENT: {
      const state: State = store.getState()
      const locationPath: string = getCurrentLocation(state)
      const isAssetsRoute: boolean = (locationPath.indexOf('/digital-assets/') === 0)

      if (payload.currentAddress && isAssetsRoute) {
        goToLocation('/transactions/all')
      }

      break
    }
    */

    /**
     * Custom Assets
     */
    /*
    case customAsset.OPEN: {
      goToWalletsIfNoActive()

      const state: State = store.getState()
      const locationPath: string = getCurrentLocation(state)
      const isEditRoute: boolean = (locationPath.indexOf('/custom-asset/edit') === 0)

      if (isEditRoute) {
        const { address }: CustomAssetData = store.getState().customAsset

        if (!address) {
          goToLocation('/custom-asset/add')
        }
      }

      break
    }

    case customAsset.SET_EDIT_ADDRESS_SUCCESS: {
      goToLocation('/custom-asset/edit')
      break
    }

    case customAsset.ADD_SUCCESS:
    case customAsset.EDIT_SUCCESS:
    case customAsset.REMOVE_SUCCESS: {
      goToLocation('/digital-assets')
      break
    }
    */

    /**
     * Transactions
     */
    /*
    case transactions.OPEN: {
      goToWalletsIfNoActive()
      break
    }

    case transactions.REPEAT: {
      goToLocation(`/funds/${payload.txData.type}`)
      break
    }
    */

    /**
     * Funds
     */
    /*
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

    case receiveFunds.OPEN: {
      goToWalletsIfNoActive()
      break
    }
    */

    default: break
  }

  return next(action)
}
