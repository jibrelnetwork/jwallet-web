// @flow strict

import bitcore from 'bitcore-lib'

export function getPrivateKeyFromXPRV(
  xprv: string,
  addressIndex: number,
): string {
  const hdPrivateKey: HDPrivateKey = new bitcore.HDPrivateKey(xprv)
  const derivedKey: HDPrivateKey = hdPrivateKey.derive(addressIndex)

  return derivedKey.privateKey.toString()
}
