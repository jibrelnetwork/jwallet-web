// @flow

import { generateAddresses } from 'utils/mnemonic'
import { WalletInconsistentDataError } from 'errors'

import {
  getWallet,
  checkMnemonicType,
} from '.'

function getAddresses(wallets: Wallets, walletId: string, start: number, end: number): Address[] {
  const {
    type,
    xpub,
  }: Wallet = getWallet(wallets, walletId)

  if (!checkMnemonicType(type) || !xpub) {
    throw new WalletInconsistentDataError({ walletId }, 'Wallet does not have public key')
  }

  return generateAddresses(xpub, start, end)
}

export default getAddresses
