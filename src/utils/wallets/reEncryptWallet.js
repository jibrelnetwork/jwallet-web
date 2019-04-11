// @flow

import checkMnemonicType from 'utils/wallets/checkMnemonicType'

import { WalletInconsistentDataError } from 'errors'

import {
  decryptData,
  encryptData,
} from 'utils/encryption'

function reEncryptWallet(
  wallet: Wallet,
  internalKey: Uint8Array,
  encryptionType: string,
  internalKeyNew: Uint8Array,
  encryptionTypeNew: string,
): Wallet {
  const {
    type,
    encrypted,
    isReadOnly,
  }: Wallet = wallet

  if (isReadOnly) {
    return wallet
  }

  if (checkMnemonicType(type) && encrypted.mnemonic && encrypted.passphrase) {
    const mnemonic: string = decryptData({
      encryptionType,
      key: internalKey,
      data: encrypted.mnemonic,
    })

    const passphrase: string = decryptData({
      encryptionType,
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
          encryptionType: encryptionTypeNew,
        }),
        passphrase: encryptData({
          data: passphrase,
          key: internalKeyNew,
          encryptionType: encryptionTypeNew,
        }),
      },
    }
  } else if (!checkMnemonicType(type) && encrypted.privateKey) {
    const privateKey: string = decryptData({
      encryptionType,
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
          encryptionType: encryptionTypeNew,
        }),
      },
    }
  }

  throw new WalletInconsistentDataError({ walletId: wallet.id }, 'reEncryptWallet error')
}

export default reEncryptWallet
