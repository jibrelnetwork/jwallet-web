// @flow strict

export function removeWallet(wallets: Wallets, walletId: WalletId): Wallets {
  return wallets.filter(({ id }: Wallet): boolean => (walletId !== id))
}
