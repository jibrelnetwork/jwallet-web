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
    address,
    derivationPath,
    customType,
    addressIndex,
    derivationIndex,
    isReadOnly,
    isSimplified,
  }: WalletUpdatedData = updatedData

  const newWallet: Wallet = {
    ...wallet,
    encrypted: encrypted || wallet.encrypted,
    name: name || wallet.name,
    xpub: xpub || wallet.xpub,
    address: address || wallet.address,
    customType: customType || wallet.customType,
    derivationPath: derivationPath || wallet.derivationPath,
    addressIndex: (addressIndex != null) ? addressIndex : wallet.addressIndex,
    derivationIndex: (derivationIndex != null) ? derivationIndex : wallet.derivationIndex,
    isReadOnly: (typeof (isReadOnly) === 'boolean') ? isReadOnly : wallet.isReadOnly,
    isSimplified: (typeof (isSimplified) === 'boolean') ? isSimplified : wallet.isSimplified,
  }

  const newItems: Wallets = removeWallet(
    items,
    wallet.id,
  )

  return appendWallet(
    newItems,
    newWallet,
  )
}
