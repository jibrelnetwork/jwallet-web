// @flow

import { t } from 'ttag'

function getWallet(wallets: Wallets, walletId: ?string): Wallet {
  if (!walletId) {
    throw new Error(t`WalletNotFoundError`)
  }

  const wallet: ?Wallet = wallets.find(({ id }: Wallet): boolean => (walletId === id))

  if (!wallet) {
    throw new Error(t`WalletNotFoundError ${walletId}`)
  }

  return { ...wallet }
}

export default getWallet
