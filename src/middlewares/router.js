// @flow

import { push } from 'react-router-redux'

import isMnemonicType from 'utils/isMnemonicType'
import * as wallets from 'routes/Wallets/modules/wallets'
import * as createWallet from 'routes/Wallets/routes/CreateWallet/modules/createWallet'
import * as importWallet from 'routes/Wallets/routes/ImportWallet/modules/importWallet'
import * as editWallet from 'routes/Wallets/routes/EditWallet/modules/editWallet'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangeWalletPassword/modules/changeWalletPassword' // eslint-disable-line max-len
import * as removeWallet from 'routes/Wallets/routes/RemoveWallet/modules/removeWallet'

export const redirect = (store: { dispatch: Dispatch }) => (next: Next) => (action: FSA) => {
  const { type, payload }: FSA = action

  switch (type) {
    case createWallet.CLOSE:
    case importWallet.CLOSE:
    case editWallet.CLOSE:
    case editWallet.EDIT_SUCCESS:
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
