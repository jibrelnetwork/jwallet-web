// @flow strict

import { WalletInconsistentDataError } from 'errors'

import {
  decryptData,
  encryptData,
} from 'utils/encryption'

import { checkReadOnlyType } from '.'

export function reEncryptWallet(
  wallet: Wallet,
  internalKey: Uint8Array,
  internalKeyNew: Uint8Array,
): Wallet {
  const {
    customType,
    encrypted,
    id: walletId,
  }: Wallet = wallet

  if (checkReadOnlyType(customType)) {
    return wallet
  }

  if (encrypted.mnemonic && encrypted.passphrase && encrypted.xprv) {
    const mnemonic: string = decryptData({
      key: internalKey,
      data: encrypted.mnemonic,
    })

    const xprv: string = decryptData({
      key: internalKey,
      // $FlowFixMe
      data: encrypted.xprv,
    })

    const passphrase: string = decryptData({
      key: internalKey,
      // $FlowFixMe
      data: encrypted.passphrase,
    })

    return {
      ...wallet,
      encrypted: {
        ...encrypted,
        mnemonic: encryptData({
          data: mnemonic,
          key: internalKeyNew,
        }),
        xprv: encryptData({
          data: xprv,
          key: internalKeyNew,
        }),
        passphrase: encryptData({
          data: passphrase,
          key: internalKeyNew,
        }),
      },
    }
  } else if (encrypted.privateKey) {
    const privateKey: string = decryptData({
      key: internalKey,
      data: encrypted.privateKey,
    })

    return {
      ...wallet,
      encrypted: {
        ...encrypted,
        privateKey: encryptData({
          data: privateKey,
          key: internalKeyNew,
        }),
      },
    }
  }

  throw new WalletInconsistentDataError({ walletId }, 'reEncryptWallet error')
}
