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
    throw new WalletInconsistentDataError('Wallet is read only', wallet.id)
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
      throw new WalletInconsistentDataError(`Invalid mnemonic type ${type}`, wallet.id)
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
      throw new WalletInconsistentDataError('Encrypted private key is empty', wallet.id)
    }

    return decryptData({
      encryptionType,
      key: internalKey,
      data: encrypted.privateKey,
    })
  }
}

export default getPrivateKey
