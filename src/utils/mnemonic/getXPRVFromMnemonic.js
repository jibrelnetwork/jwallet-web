// @flow strict

import { getPrivateHdRoot } from '.'

export function getXPRVFromMnemonic(
  mnemonic: string,
  passphrase: ?string,
  derivationPath: ?string,
): string {
  const hdRoot: HDPrivateKey = getPrivateHdRoot(mnemonic, passphrase, derivationPath)

  return hdRoot.xprivkey
}
