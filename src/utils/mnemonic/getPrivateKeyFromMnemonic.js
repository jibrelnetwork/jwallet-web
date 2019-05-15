// @flow strict

import { getPrivateHdRoot } from '.'

export function getPrivateKeyFromMnemonic(
  mnemonic: string,
  addressIndex: number,
  passphrase: ?string,
  derivationPath: ?string,
): string {
  const hdRoot: HDPrivateKey = getPrivateHdRoot(mnemonic, passphrase, derivationPath)
  const generatedKey: HDPrivateKey = hdRoot.derive(addressIndex)

  return generatedKey.privateKey.toString()
}
