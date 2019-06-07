// @flow strict

import {
  appendWallet,
  removeWallet,
} from '.'

export function updateWallet(
  items: Wallets,
  wallet: Wallet,
  updatedData: WalletUpdatedData,
): Wallets {
  const {
    encrypted,
    name,
    xpub,
    derivationPath,
    customType,
    addressIndex,
    isReadOnly,
    isSimplified,
  }: WalletUpdatedData = updatedData

  const newWallet: Wallet = {
    ...wallet,
    encrypted: encrypted || wallet.encrypted,
    name: name || wallet.name,
    xpub: xpub || wallet.xpub,
    customType: customType || wallet.customType,
    derivationPath: derivationPath || wallet.derivationPath,
    addressIndex: (addressIndex != null) ? addressIndex : wallet.addressIndex,
    isReadOnly: (typeof (isReadOnly) === 'boolean') ? isReadOnly : wallet.isReadOnly,
    isSimplified: (typeof (isSimplified) === 'boolean') ? isSimplified : wallet.isSimplified,
  }

  const newItems: Wallets = removeWallet(items, wallet.id)

  return appendWallet(newItems, newWallet)
}
