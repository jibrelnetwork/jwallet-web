// @flow strict

import { generateAddresses } from 'utils/mnemonic'
import { WalletInconsistentDataError } from 'errors'

import { checkMultiAddressType } from '.'

export function getAddress({
  xpub,
  address,
  customType,
  addressIndex,
  id: walletId,
}: Wallet): Address {
  if (!checkMultiAddressType(customType)) {
    if (!address) {
      throw new WalletInconsistentDataError({ walletId }, 'wallet does not have address')
    }

    return address
  }

  const indexStart: number = addressIndex || 0
  const indexEnd: number = indexStart + 1

  if (!xpub) {
    throw new WalletInconsistentDataError({ walletId }, 'xpub is empty')
  }

  const derivedAddresses: Address[] = generateAddresses(xpub, indexStart, indexEnd)

  return derivedAddresses[0]
}
