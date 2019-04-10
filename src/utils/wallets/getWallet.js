// @flow

import { WalletNotFoundError } from 'errors'

function getWallet(wallets: Wallets, walletId: ?string): Wallet {
  if (!walletId) {
    throw new WalletNotFoundError(null)
  }

  const wallet: ?Wallet = wallets.find(({ id }: Wallet): boolean => (walletId === id))

  if (!wallet) {
    throw new WalletNotFoundError({ walletId })
  }

  return { ...wallet }
}

export default getWallet
