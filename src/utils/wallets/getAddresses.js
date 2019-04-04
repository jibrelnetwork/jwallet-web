// @flow

import generateAddresses from 'utils/mnemonic/generateAddresses'
import { WalletInconsistentDataError } from 'errors'

import {
  getWallet,
  checkMnemonicType,
} from '.'

function getAddresses(wallets: Wallets, walletId: string, start: number, end: number): Address[] {
  const {
    type,
    bip32XPublicKey,
  }: Wallet = getWallet(wallets, walletId)

  if (!checkMnemonicType(type) || !bip32XPublicKey) {
    throw new WalletInconsistentDataError({ walletId }, 'Wallet does not have public key')
  }

  return generateAddresses(bip32XPublicKey, start, end)
}

export default getAddresses
