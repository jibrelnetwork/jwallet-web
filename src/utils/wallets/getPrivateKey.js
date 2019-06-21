// @flow strict

import { decryptData } from 'utils/encryption'
import { WalletInconsistentDataError } from 'errors'
import { getPrivateKeyFromXPRV } from 'utils/mnemonic'

export function getPrivateKey(wallet: Wallet, internalKey: Uint8Array): string {
  const {
    id,
    encrypted,
    addressIndex,
  }: Wallet = wallet

  if (encrypted.xprv) {
    return getPrivateKeyFromXPRV(
      decryptData({
        key: internalKey,
        data: encrypted.xprv,
      }),
      addressIndex || 0,
    )
  } else if (encrypted.privateKey) {
    return decryptData({
      key: internalKey,
      data: encrypted.privateKey,
    })
  } else {
    throw new WalletInconsistentDataError({ walletId: id })
  }
}
