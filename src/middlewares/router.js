// @flow

import { push } from 'react-router-redux'

import * as removeWallet from 'routes/Wallets/routes/RemoveWallet/modules/removeWallet'

export const redirect = (store: { dispatch: Dispatch }) => (next: Next) => (action: FSA) => {
  const { type }: FSA = action

  switch (type) {
    case removeWallet.CLOSE: {
      store.dispatch(push('/'))
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
