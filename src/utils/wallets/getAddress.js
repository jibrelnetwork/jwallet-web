// @flow

import { generateAddresses } from 'utils/mnemonic'
import { WalletInconsistentDataError } from 'errors'

import {
  getWallet,
  checkMnemonicType,
} from '.'

function getAddress(wallets: Wallets, walletId: string): Address {
  const {
    type,
    xpub,
    address,
    addressIndex,
  }: Wallet = getWallet(wallets, walletId)

  if (!checkMnemonicType(type)) {
    if (!address) {
      throw new WalletInconsistentDataError({ walletId }, '!checkMnemonicType and !address')
    }

    return address
  }

  const indexStart: number = addressIndex || 0
  const indexEnd: number = indexStart + 1

  if (!xpub) {
    throw new WalletInconsistentDataError({ walletId }, 'bip32XPublicKey is empty')
  }

  const derivedAddresses: Address[] = generateAddresses(xpub, indexStart, indexEnd)

  return derivedAddresses[0]
}

export default getAddress
