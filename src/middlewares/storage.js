// @flow

import { keystore, storage } from 'services'
import * as createWallet from 'routes/Wallets/routes/CreateWallet/modules/createWallet'
import * as importWallet from 'routes/Wallets/routes/ImportWallet/modules/importWallet'
import * as editWallet from 'routes/Wallets/routes/EditWallet/modules/editWallet'
import * as removeWallet from 'routes/Wallets/routes/RemoveWallet/modules/removeWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangeWalletPassword/modules/changeWalletPassword' // eslint-disable-line max-len

export const set = () => (next: Next) => (action: FSA) => {
  const { type }: FSA = action

  switch (type) {
    case createWallet.CREATE_SUCCESS:
    case importWallet.IMPORT_SUCCESS:
    case editWallet.EDIT_SUCCESS:
    case changeWalletPassword.CHANGE_PASSWORD_SUCCESS:
    case removeWallet.REMOVE_SUCCESS: {
      storage.setKeystore(keystore.serialize())
      break
    }

    default: break
  }

  return next(action)
}
