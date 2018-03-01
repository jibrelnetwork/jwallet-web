// @flow

import { keystore, storage } from 'services'
import * as wallets from 'routes/Wallets/modules/wallets'
import * as createWallet from 'routes/Wallets/routes/CreateWallet/modules/createWallet'
import * as importWallet from 'routes/Wallets/routes/ImportWallet/modules/importWallet'
import * as editWallet from 'routes/Wallets/routes/EditWallet/modules/editWallet'
import * as removeWallet from 'routes/Wallets/routes/RemoveWallet/modules/removeWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangeWalletPassword/modules/changeWalletPassword' // eslint-disable-line max-len

export const set = (store: { dispatch: Dispatch }) => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  switch (type) {
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
