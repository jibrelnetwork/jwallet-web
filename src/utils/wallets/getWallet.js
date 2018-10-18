// @flow

function getWallet(wallets: Wallets, walletId: ?WalletId): ?Wallet {
  return walletId
    ? wallets.find((w: Wallet): boolean => (w.id === walletId))
    : null
}

export default getWallet
