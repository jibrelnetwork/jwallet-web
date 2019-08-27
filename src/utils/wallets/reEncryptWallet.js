// @flow strict

import {
  decryptData,
  encryptData,
} from 'utils/encryption'

import {
  checkReadOnlyType,
  checkMultiAddressType,
} from '.'

export function reEncryptWallet(
  wallet: Wallet,
  internalKey: Uint8Array,
  internalKeyNew: Uint8Array,
): Wallet {
  const {
    encrypted,
    customType,
  }: Wallet = wallet

  if (checkReadOnlyType(customType)) {
    return wallet
  }

  if (checkMultiAddressType(customType)) {
    const mnemonic: ?string = encrypted.mnemonic && decryptData({
      key: internalKey,
      data: encrypted.mnemonic,
    })

    const xprv: ?string = encrypted.xprv && decryptData({
      key: internalKey,
      data: encrypted.xprv,
    })

    const passphrase: ?string = encrypted.passphrase && decryptData({
      key: internalKey,
      data: encrypted.passphrase,
    })

    return {
      ...wallet,
      encrypted: {
        ...encrypted,
        mnemonic: mnemonic && encryptData({
          data: mnemonic,
          key: internalKeyNew,
        }),
        xprv: xprv && encryptData({
          data: xprv,
          key: internalKeyNew,
        }),
        /**
         * passphrase could be empty string in case of 'mnemonic' type
         * but it should be null in case of 'xprv' type
         * so we should use strict equal comparison with null
         */
        passphrase: (passphrase === null) ? null : encryptData({
          data: passphrase,
          key: internalKeyNew,
        }),
      },
    }
  } else {
    const privateKey: ?string = encrypted.privateKey && decryptData({
      key: internalKey,
      data: encrypted.privateKey,
    })

    return {
      ...wallet,
      encrypted: {
        ...encrypted,
        privateKey: privateKey && encryptData({
          data: privateKey,
          key: internalKeyNew,
        }),
      },
    }
  }
}
