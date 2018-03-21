// @flow

import { propEq } from 'ramda'

import { keystore, storage } from 'services'

/**
 * i18n
 */
import * as i18n from 'routes/modules/i18n'

/**
 * Networks
 */
import * as networks from 'routes/modules/networks'

/**
 * Wallets
 */
import * as wallets from 'routes/Wallets/modules/wallets'
import * as createWallet from 'routes/Wallets/routes/CreateWallet/modules/createWallet'
import * as importWallet from 'routes/Wallets/routes/ImportWallet/modules/importWallet'
import * as editWallet from 'routes/Wallets/routes/EditWallet/modules/editWallet'
import * as removeWallet from 'routes/Wallets/routes/RemoveWallet/modules/removeWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangeWalletPassword/modules/changeWalletPassword' // eslint-disable-line max-len

/**
 * Digital Assets
 */
import * as digitalAssets from 'routes/DigitalAssets/modules/digitalAssets'
import * as addCustomAsset from 'routes/AddCustomAsset/modules/addCustomAsset'

export const set = (store: Store) => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action
  const networkId: ?NetworkId = store.getState().networks.currentNetwork

  switch (type) {
    /**
     * i18n
     */
    case i18n.SET_LANGUAGE: {
      const { languageCode }: { languageCode: LanguageCode } = payload
      storage.setI18n(languageCode)

      const { origin, pathname } = window.location
      window.location.href = `${origin}${pathname}?lang=${languageCode}`

      break
    }

    /**
     * Networks
     */
    case networks.INIT: {
      try {
        const storedNetworks: Networks = JSON.parse(storage.getNetworks())
        store.dispatch(networks.setNetworks(storedNetworks))
      } catch (err) {
        store.dispatch(networks.setNetworks())
      }

      try {
        const currentNetwork: NetworkId = storage.getCurrentNetwork()
        store.dispatch(networks.setCurrentNetwork(currentNetwork))
      } catch (err) {
        store.dispatch(networks.setCurrentNetwork())
      }

      store.dispatch(networks.initFinish())
      store.dispatch(wallets.init())

      break
    }

    case networks.SET_NETWORKS_SUCCESS: {
      storage.setNetworks(JSON.stringify(payload.items.filter(propEq('isCustom', true))))
      break
    }

    case networks.SET_CURRENT_SUCCESS: {
      const { currentNetwork }: { currentNetwork: NetworkId } = payload

      storage.setCurrentNetwork(currentNetwork)
      break
    }

    case networks.SAVE_CUSTOM_NETWORK_SUCCESS: {
      storage.setNetworks(JSON.stringify(payload.items.filter(propEq('isCustom', true))))
      break
    }

    /**
     * Wallets
     */
    case wallets.INIT: {
      try {
        keystore.deserialize(storage.getKeystore())

        const items: Wallets = keystore.getWallets()
        store.dispatch(wallets.setWallets(items))

        const activeWalletId: WalletId = storage.getKeystoreActiveWalletId()
        store.dispatch(wallets.setActiveWalletId(activeWalletId))
      } catch (err) {
        store.dispatch(wallets.setWallets([]))
        store.dispatch(wallets.setActiveWalletId())
      }

      store.dispatch(wallets.initFinish())
      store.dispatch(digitalAssets.init())

      break
    }

    case wallets.OPEN: {
      try {
        const items: Wallets = keystore.getWallets()
        store.dispatch(wallets.setWallets(items))
      } catch (err) {
        store.dispatch(wallets.setWallets([]))
      }

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

    case createWallet.CREATE_SUCCESS:
    case importWallet.IMPORT_SUCCESS:
    case editWallet.EDIT_SUCCESS:
    case changeWalletPassword.CHANGE_PASSWORD_SUCCESS:
    case removeWallet.REMOVE_SUCCESS: {
      storage.setKeystore(keystore.serialize())
      break
    }

    /**
     * Digital Assets
     */
    case digitalAssets.INIT: {
      try {
        const storedDigitalAssets: DigitalAssets = JSON.parse(storage.getDigitalAssets(networkId))
        store.dispatch(digitalAssets.setAssets(storedDigitalAssets))
      } catch (err) {
        store.dispatch(digitalAssets.setAssets())
      }

      try {
        const currentDigitalAsset: Address = storage.getCurrentDigitalAsset(networkId)
        store.dispatch(digitalAssets.setCurrent(currentDigitalAsset))
      } catch (err) {
        store.dispatch(digitalAssets.setCurrent())
      }

      store.dispatch(digitalAssets.initFinish())

      break
    }

    case digitalAssets.SET_ASSETS_SUCCESS: {
      storage.setDigitalAssets(JSON.stringify(payload.items), networkId)
      break
    }

    case digitalAssets.SET_CURRENT: {
      const { currentAddress }: { currentAddress: ?Address } = payload

      if (!currentAddress) {
        storage.removeCurrentDigitalAsset(networkId)
        break
      }

      storage.setCurrentDigitalAsset(currentAddress, networkId)
      break
    }

    case addCustomAsset.ADD_SUCCESS: {
      storage.setDigitalAssets(JSON.stringify(payload.newDigitalAssets), networkId)
      break
    }

    default: break
  }

  return next(action)
}
