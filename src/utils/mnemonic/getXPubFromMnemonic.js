// @flow

import getPrivateHdRoot from './getPrivateHdRoot'

function getXPubFromMnemonic(
  mnemonic: string,
  passphrase: string,
  derivationPath: string,
  network?: null | number | string = null,
): string {
  const hdRoot: HDPrivateKey = getPrivateHdRoot(mnemonic, passphrase, derivationPath, network)

  return hdRoot.hdPublicKey.toString()
}

export default getXPubFromMnemonic
