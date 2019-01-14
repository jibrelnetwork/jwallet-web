// @flow

import getWallet from './getWallet'

function removeWallet(wallets: Wallets, walletId: string): Wallets {
  const wallet: Wallet = getWallet(wallets, walletId)

  return wallets.filter(({ id }: Wallet): boolean => (wallet.id !== id))
}

export default removeWallet
