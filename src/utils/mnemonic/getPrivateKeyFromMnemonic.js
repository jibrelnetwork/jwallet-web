// @flow

import getPrivateHdRoot from './getPrivateHdRoot'

function getPrivateKeyFromMnemonic(
  mnemonic: string,
  addressIndex: number,
  passphrase: string,
  derivationPath: string,
  network: null | number | string,
): string {
  const hdRoot: HDPrivateKey = getPrivateHdRoot(mnemonic, passphrase, derivationPath, network)
  const generatedKey: HDPrivateKey = hdRoot.derive(addressIndex)

  return generatedKey.privateKey.toString()
}

export default getPrivateKeyFromMnemonic
