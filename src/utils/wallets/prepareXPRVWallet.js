// @flow strict

import { encryptData } from 'utils/encryption'
import { getXPUBFromXPRV } from 'utils/mnemonic'

export function prepareXPRVWallet(
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

  return {
    id,
    name,
    orderIndex,
    createdBlockNumber,
    addressIndex: 0,
    type: 'mnemonic',
    isReadOnly: false,
    customType: 'xprv',
    derivationIndex: 0,
    isSimplified: true,
    xpub: getXPUBFromXPRV(data),
    encrypted: {
      mnemonic: null,
      privateKey: null,
      passphrase: null,
      xprv: encryptData({
        data,
        key: internalKey,
      }),
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    address: null,
    derivationPath: null,
  }
}
