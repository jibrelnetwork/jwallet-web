// @flow strict

import bitcore from 'bitcore-lib'

export function getPublicHdRoot(xpub: string): HDPublicKey {
  return new bitcore.HDPublicKey(xpub)
}
