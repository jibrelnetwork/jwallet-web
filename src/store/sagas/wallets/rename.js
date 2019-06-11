// @flow strict

import { takeEvery } from 'redux-saga/effects'

import { WalletNotFoundError } from 'errors'
import { walletsPlugin } from 'store/plugins'
import { getWalletById } from 'utils/wallets'

import * as walletsRename from 'store/modules/walletsRename'

function rename(action: ExtractReturn<typeof walletsRename.rename>): Saga<void> {
  const {
    items,
    name,
    walletId,
  } = action.payload

  if (!name) {
    return
  }

  const foundWallet: ?Wallet = getWalletById(items, walletId)

  if (!foundWallet) {
    throw new WalletNotFoundError({ walletId })
  }

  if (foundWallet.name === name) {
    return
  }

  walletsPlugin.updateWallet(walletId, { name })
}

export function* walletsRenameRootSaga(): Saga<void> {
  yield takeEvery(walletsRename.RENAME, rename)
}
