// @flow strict

import bitcore from 'bitcore-lib'

import { getHdPath } from '.'

export function getPrivateHdRoot(
  mnemonic: string,
  passphrase: ?string,
  derivationPath: ?string,
): HDPrivateKey {
  const hdPath: string = getHdPath(mnemonic, passphrase, derivationPath)

  return new bitcore.HDPrivateKey(hdPath)
}
