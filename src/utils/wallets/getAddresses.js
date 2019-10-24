// @flow strict

import { generateAddresses } from 'utils/mnemonic'
import { WalletInconsistentDataError } from 'errors'

export function getAddresses(
  {
    xpub,
    id: walletId,
  }: Wallet,
  start: number,
  end: number,
): Address[] {
  if (!xpub) {
    throw new WalletInconsistentDataError({ walletId }, 'Wallet does not have public key')
  }

  return generateAddresses(xpub, start, end)
}
