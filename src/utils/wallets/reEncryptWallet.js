// @flow strict

import { checkMnemonicType } from 'utils/wallets'
import { WalletInconsistentDataError } from 'errors'

import {
  decryptData,
  encryptData,
} from 'utils/encryption'

function reEncryptWallet(
  wallet: Wallet,
  internalKey: Uint8Array,
  internalKeyNew: Uint8Array,
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
      key: internalKey,
      data: encrypted.mnemonic,
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
        passphrase: encryptData({
          data: passphrase,
          key: internalKeyNew,
        }),
      },
    }
  } else if (!checkMnemonicType(type) && encrypted.privateKey) {
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

  throw new WalletInconsistentDataError({ walletId: wallet.id }, 'reEncryptWallet error')
}

export default reEncryptWallet
