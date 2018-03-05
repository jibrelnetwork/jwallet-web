// @flow

import { keystore, storage } from 'services'

/**
 * Digital Assets
 */

import * as digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'

/**
 * Wallets
 */

import * as wallets from 'routes/Wallets/modules/wallets'
import * as createWallet from 'routes/Wallets/routes/CreateWallet/modules/createWallet'
import * as importWallet from 'routes/Wallets/routes/ImportWallet/modules/importWallet'
import * as editWallet from 'routes/Wallets/routes/EditWallet/modules/editWallet'
import * as removeWallet from 'routes/Wallets/routes/RemoveWallet/modules/removeWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangeWalletPassword/modules/changeWalletPassword' // eslint-disable-line max-len

export const set = (store: { dispatch: Dispatch }) => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  switch (type) {
    /**
     * Digital Assets
     */

    case digitalAssets.OPEN: {
      try {
        const customDigitalAssets: DigitalAssets = JSON.parse(storage.getDigitalAssets())
        store.dispatch(digitalAssets.setAssets(customDigitalAssets))
      } catch (err) {
        store.dispatch(digitalAssets.setAssets())
      }

      try {
        const currentDigitalAsset: Address = JSON.parse(storage.getCurrentDigitalAsset())
        store.dispatch(digitalAssets.setCurrent(currentDigitalAsset))
      } catch (err) {
        store.dispatch(digitalAssets.setCurrent())
      }

      break
    }

    case digitalAssets.SET_ASSETS_SUCCESS: {
      storage.setDigitalAssets(JSON.stringify(payload.items))

      break
    }

    case digitalAssets.SET_CURRENT: {
      const { currentAddress }: { currentAddress: ?Address } = payload

      if (!currentAddress) {
        storage.removeCurrentDigitalAsset()
        break
      }

      storage.setCurrentDigitalAsset(currentAddress)
      break
    }

    /**
     * Wallets
     */

    case createWallet.CREATE_SUCCESS:
    case importWallet.IMPORT_SUCCESS:
    case editWallet.EDIT_SUCCESS:
    case changeWalletPassword.CHANGE_PASSWORD_SUCCESS:
    case removeWallet.REMOVE_SUCCESS: {
      storage.setKeystore(keystore.serialize())
      break
    }

    case wallets.INIT: {
      try {
        keystore.deserialize(storage.getKeystore())
      } catch (err) {
        store.dispatch(wallets.setWallets([]))
        store.dispatch(wallets.setActiveWalletId())
        break
      }

      const items = keystore.getWallets()
      store.dispatch(wallets.setWallets(items))

      const activeWalletId = storage.getKeystoreActiveWalletId()
      store.dispatch(wallets.setActiveWalletId(activeWalletId))

      break
    }

    case wallets.SET_ACTIVE_WALLET_ID: {
      if (payload.activeWalletId) {
        storage.setKeystoreActiveWalletId(payload.activeWalletId)
      } else {
        storage.removeKeystoreActiveWalletId()
      }

      break
    }

    default: break
  }

  return next(action)
}
