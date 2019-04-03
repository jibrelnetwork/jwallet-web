// @flow

import decryptData from 'utils/encryption/decryptData'
import getPrivateKeyFromMnemonic from 'utils/mnemonic/getPrivateKeyFromMnemonic'
import { WalletInconsistentDataError } from 'errors'

import checkMnemonicType from './checkMnemonicType'

function getPrivateKey(wallet: Wallet, internalKey: Uint8Array, encryptionType: string): string {
  const {
    encrypted,
    type,
    isReadOnly,
  }: Wallet = wallet

  if (isReadOnly) {
    throw new WalletInconsistentDataError({ walletId: wallet.id }, 'Wallet is read only')
  }

  if (checkMnemonicType(type)) {
    const {
      network,
      addressIndex,
      derivationPath,
    }: Wallet = wallet

    if (
      !encrypted.mnemonic ||
      !encrypted.passphrase ||
      !network ||
      !derivationPath
    ) {
      throw new WalletInconsistentDataError(
        { walletId: wallet.id },
        'Invalid mnemonic type',
      )
    }

    const mnemonic: string = decryptData({
      encryptionType,
      key: internalKey,
      data: encrypted.mnemonic,
    })

    return getPrivateKeyFromMnemonic(
      mnemonic,
      addressIndex || 0,
      decryptData({
        encryptionType,
        key: internalKey,
        // $FlowFixMe
        data: encrypted.passphrase,
      }),
      derivationPath,
      network,
    )
  } else {
    if (!encrypted.privateKey) {
      throw new WalletInconsistentDataError(
        { walletId: wallet.id },
        'Encrypted private key is empty',
      )
    }

    return decryptData({
      encryptionType,
      key: internalKey,
      data: encrypted.privateKey,
    })
  }
}

export default getPrivateKey
