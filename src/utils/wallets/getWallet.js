// @flow

function getWallet(wallets: Wallets, walletId: ?string): Wallet {
  if (!walletId) {
    throw new Error('Wallet ID not provided')
  }

  const wallet: ?Wallet = wallets.find(({ id }: Wallet): boolean => (walletId === id))

  if (!wallet) {
    throw new Error(`Wallet with id ${walletId} not found`)
  }

  return { ...wallet }
}

export default getWallet
