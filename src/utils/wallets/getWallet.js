// @flow

function getWallet(wallets: Wallets, walletId: ?string): Wallet {
  if (!walletId) {
    throw new Error('WalletNotFoundError')
  }

  const wallet: ?Wallet = wallets.find(({ id }: Wallet): boolean => (walletId === id))

  if (!wallet) {
    throw new Error(`WalletNotFoundError ${walletId}`)
  }

  return { ...wallet }
}

export default getWallet
