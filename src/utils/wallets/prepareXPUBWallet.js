// @flow strict

export function prepareXPUBWallet({
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
    xpub: data,
    addressIndex: 0,
    isReadOnly: true,
    type: 'mnemonic',
    customType: 'xpub',
    derivationIndex: 0,
    isSimplified: true,
    encrypted: {
      xprv: null,
      mnemonic: null,
      privateKey: null,
      passphrase: null,
    },
    /**
       * Another wallet data, necessary for consistency of types
       */
    address: null,
    derivationPath: null,
  }
}
