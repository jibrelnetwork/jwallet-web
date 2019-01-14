// @flow

import {
  getWallet,
  checkMnemonicType,
  generateAddresses,
} from '.'

function getAddresses(wallets: Wallets, walletId: string, start: number, end: number): Address[] {
  const {
    type,
    bip32XPublicKey,
  }: Wallet = getWallet(wallets, walletId)

  if (!checkMnemonicType(type) || !bip32XPublicKey) {
    throw new Error('Invalid wallet type')
  }

  return generateAddresses(bip32XPublicKey, start, end)
}

export default getAddresses
