// @flow strict

import { encryptData } from 'utils/encryption'

import {
  strip0x,
  getAddressFromPrivateKey,
} from 'utils/address'

export function preparePrivateKeyWallet(
  walletData: WalletNewData,
  internalKey: Uint8Array,
): Wallet {
  const {
    id,
    data,
    name,
    orderIndex,
    createdBlockNumber,
  }: WalletNewData = walletData

  const privateKey: string = data.toLowerCase()

  return {
    id,
    name,
    orderIndex,
    createdBlockNumber,
    type: 'address',
    isReadOnly: false,
    customType: 'privateKey',
    address: getAddressFromPrivateKey(privateKey),
    encrypted: {
      xprv: null,
      mnemonic: null,
      passphrase: null,
      privateKey: encryptData({
        key: internalKey,
        data: strip0x(privateKey),
      }),
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    xpub: null,
    isSimplified: null,
    addressIndex: null,
    derivationPath: null,
  }
}
