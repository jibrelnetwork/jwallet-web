// @flow

import generateAddresses from 'utils/mnemonic/generateAddresses'
import { WalletInconsistentDataError } from 'errors'

import {
  getWallet,
  checkMnemonicType,
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
      throw new WalletInconsistentDataError('!checkMnemonicType and !address', walletId)
    }

    return address
  }

  const indexStart: number = addressIndex || 0
  const indexEnd: number = indexStart + 1

  if (!bip32XPublicKey) {
    throw new WalletInconsistentDataError('bip32XPublicKey is empty', walletId)
  }

  const derivedAddresses: Address[] = generateAddresses(bip32XPublicKey, indexStart, indexEnd)

  return derivedAddresses[0]
}

export default getAddress
