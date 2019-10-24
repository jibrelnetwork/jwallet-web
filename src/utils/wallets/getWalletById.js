// @flow strict

import { findWalletByProperty } from '.'

export function getWalletById(items: Wallets, walletId: string): ?Wallet {
  return findWalletByProperty(
    items,
    walletId,
    'id',
  )
}
