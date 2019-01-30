// @flow

import {
  getWallet,
  appendWallet,
  removeWallet,
} from '.'

function updateWallet(
  wallets: Wallets,
  walletId: string,
  updatedData: WalletUpdatedData,
): Wallets {
  const {
    encrypted,
    name,
    network,
    derivationPath,
    customType,
    bip32XPublicKey,
    addressIndex,
    isReadOnly,
  }: WalletUpdatedData = updatedData

  const wallet: Wallet = getWallet(wallets, walletId)

  const newWallet: Wallet = {
    ...wallet,
    encrypted: encrypted || wallet.encrypted,
    name: name || wallet.name,
    network: network || wallet.network,
    customType: customType || wallet.customType,
    derivationPath: derivationPath || wallet.derivationPath,
    bip32XPublicKey: bip32XPublicKey || wallet.bip32XPublicKey,
    addressIndex: (addressIndex != null) ? addressIndex : wallet.addressIndex,
    isReadOnly: (typeof (isReadOnly) === 'boolean') ? isReadOnly : wallet.isReadOnly,
  }

  const newWallets: Wallets = removeWallet(wallets, walletId)

  return appendWallet(newWallets, newWallet)
}

export default updateWallet
