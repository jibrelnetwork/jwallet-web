// @flow strict

import { decryptData } from '.'

export function decryptInternalKey(
  internalKey: EncryptedData,
  derivedKey: Uint8Array,
): Uint8Array {
  const key: string = decryptData({
    key: derivedKey,
    data: internalKey,
  })

  return new Uint8Array(key.split(',').map(i => parseInt(i, 10)))
}
