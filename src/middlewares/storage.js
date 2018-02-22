// @flow

import { keystore, storage } from 'services'
import * as changeWalletPassword from 'routes/Wallets/routes/ChangeWalletPassword/modules/changeWalletPassword' // eslint-disable-line max-len

export const set = () => (next: Next) => (action: FSA) => {
  const { type }: FSA = action

  switch (type) {
    case changeWalletPassword.CHANGE_PASSWORD_SUCCESS: {
      storage.setKeystore(keystore.serialize())
      break
    }

    default: break
  }

  return next(action)
}
