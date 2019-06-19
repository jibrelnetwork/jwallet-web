// @flow strict

import { getAddressChecksum } from 'utils/address'

export function prepareAddressWallet({
  id,
  data,
  name,
  orderIndex,
  createdBlockNumber,
}: WalletNewData): Wallet {
  return {
    id,
    name,
    orderIndex,
    createdBlockNumber,
    type: 'address',
    isReadOnly: true,
    customType: 'address',
    address: getAddressChecksum(data),
    encrypted: {
      xprv: null,
      mnemonic: null,
      passphrase: null,
      privateKey: null,
    },
    /**
     * Another wallet data, necessary for consistency of types
     */
    xpub: null,
    isSimplified: null,
    addressIndex: null,
    derivationPath: null,
    derivationIndex: null,
  }
}
