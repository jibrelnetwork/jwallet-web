// @flow strict

export function removeWallet(items: Wallets, walletId: WalletId): Wallets {
  return items.filter(({ id }: Wallet): boolean => (walletId !== id))
}
