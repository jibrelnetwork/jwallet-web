// @flow

import keystore from 'services/keystore'

function checkWalletReadOnly(id: ?WalletId): boolean {
  if (!id) {
    return false
  }

  try {
    const wallet: Wallet = keystore.getWallet(id)

    return wallet.isReadOnly
  } catch (err) {
    return false
  }
}

export default checkWalletReadOnly
