// @flow strict

import { decryptData } from 'utils/encryption'
import { WalletInconsistentDataError } from 'errors'
import { getPrivateKeyFromMnemonic } from 'utils/mnemonic'

import { checkMnemonicType } from '.'

function getPrivateKey(wallet: Wallet, internalKey: Uint8Array): string {
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
      key: internalKey,
      data: encrypted.mnemonic,
    })

    return getPrivateKeyFromMnemonic(
      mnemonic,
      addressIndex || 0,
      decryptData({
        key: internalKey,
        // $FlowFixMe
        data: encrypted.passphrase,
      }),
      derivationPath,
    )
  } else {
    if (!encrypted.privateKey) {
      throw new WalletInconsistentDataError(
        { walletId: wallet.id },
        'Encrypted private key is empty',
      )
    }

    return decryptData({
      key: internalKey,
      data: encrypted.privateKey,
    })
  }
}

export default getPrivateKey
