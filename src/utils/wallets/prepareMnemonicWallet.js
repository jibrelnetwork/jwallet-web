// @flow strict

import { encryptData } from 'utils/encryption'

import {
  getXPUBFromMnemonic,
  getXPRVFromMnemonic,
} from 'utils/mnemonic'

export function prepareMnemonicWallet(
  walletData: WalletNewData,
  internalKey: Uint8Array,
): Wallet {
  const {
    id,
    data,
    name,
    passphrase,
    derivationPath,
    orderIndex,
    createdBlockNumber,
  }: WalletNewData = walletData

  const mnemonic: string = data.toLowerCase()
  const xpub: string = getXPUBFromMnemonic(mnemonic, passphrase, derivationPath)
  const xprv: string = getXPRVFromMnemonic(mnemonic, passphrase, derivationPath)

  return {
    id,
    xpub,
    name,
    orderIndex,
    derivationPath,
    createdBlockNumber,
    addressIndex: 0,
    isReadOnly: false,
    isSimplified: true,
    type: 'mnemonic',
    customType: 'mnemonic',
    encrypted: {
      privateKey: null,
      xprv: encryptData({
        key: internalKey,
        data: xprv,
      }),
      mnemonic: encryptData({
        key: internalKey,
        data: mnemonic,
      }),
      passphrase: encryptData({
        key: internalKey,
        data: passphrase || '',
      }),
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    address: null,
  }
}
