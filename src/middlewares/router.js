// @flow

import { isEmpty } from 'ramda'
import { push } from 'react-router-redux'

import keystore from 'services/keystore'
import checkMnemonicType from 'utils/keystore/checkMnemonicType'

/**
 * Wallets
 */
import * as wallets from 'routes/Wallets/modules/wallets'
import * as start from 'routes/Wallets/routes/Start/modules/start'
import * as mnemonicAddresses from 'routes/Wallets/routes/Addresses/modules/mnemonicAddresses'
import * as editWallet from 'routes/Wallets/routes/Edit/modules/editWallet'
import * as backupWallet from 'routes/Wallets/routes/Backup/modules/backupWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangePassword/modules/changeWalletPassword' // eslint-disable-line max-len
import * as removeWallet from 'routes/Wallets/routes/Remove/modules/removeWallet'

/**
 * Digital Assets
 */
import * as digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'

/**
 * Custom Asset
 */
import * as customAsset from 'routes/CustomAsset/modules/customAsset'

/**
 * Transactions
 */
import * as transactions from 'routes/Transactions/modules/transactions'

/**
 * Funds
 */
import * as sendFunds from 'routes/Funds/routes/Send/modules/sendFunds'
import * as receiveFunds from 'routes/Funds/routes/Receive/modules/receiveFunds'

export const redirect = (store: Store) => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  function goToLocation(location: string) {
    store.dispatch(push(location))
  }

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

          if (!checkMnemonicType(walletType)) {
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
      if (checkMnemonicType(payload.walletType)) {
        // if mnemonic - set some address
        goToLocation('/wallets/addresses')
      } else if (payload.walletAction) {
        // if wallet action - go to appropriate page
        goToLocation(`/wallets/${payload.walletAction}`)
      } else if (payload.walletType) {
        // if another type of wallet - go to index
        goToLocation('/')
      }

      // otherwise - stay still

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
    case backupWallet.BACKUP_SUCCESS: {
      goToLocation('/')
      break
    }

    case changeWalletPassword.CHANGE_PASSWORD_SUCCESS:
    case removeWallet.REMOVE_SUCCESS: {
      goToLocation('/wallets')
      break
    }

    /**
     * Digital Assets
     */
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

    /**
     * Custom Assets
     */
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

    /**
     * Transactions
     */
    case transactions.OPEN: {
      goToWalletsIfNoActive()
      break
    }

    case transactions.REPEAT: {
      goToLocation(`/funds/${payload.txData.type}`)
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

    case receiveFunds.OPEN: {
      goToWalletsIfNoActive()
      break
    }

    default: break
  }

  return next(action)
}
