// @flow

import {
  getWallet,
  checkMnemonicType,
  generateAddresses,
} from '.'

function getAddress(wallets: Wallets, walletId: string): Address {
  const {
    type,
    address,
    bip32XPublicKey,
    addressIndex,
  }: Wallet = getWallet(wallets, walletId)

  if (!checkMnemonicType(type)) {
    if (!address) {
      throw new Error('Invalid wallet data')
    }

    return address
  }

  const indexStart: number = addressIndex || 0
  const indexEnd: number = indexStart + 1

  if (!bip32XPublicKey) {
    throw new Error('Invalid wallet data')
  }

  const derivedAddresses: Address[] = generateAddresses(bip32XPublicKey, indexStart, indexEnd)

  return derivedAddresses[0]
}

export default getAddress
