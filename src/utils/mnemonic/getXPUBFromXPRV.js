// @flow strict

import bitcore from 'bitcore-lib'

export function getXPUBFromXPRV(xprv: string): string {
  const hdRoot: HDPrivateKey = new bitcore.HDPrivateKey(xprv)

  return hdRoot.hdPublicKey.toString()
}
