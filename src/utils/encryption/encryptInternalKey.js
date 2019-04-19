// @flow

import { encryptData } from '.'

export function encryptInternalKey(
  internalKey: Uint8Array,
  derivedKey: Uint8Array,
): EncryptedData {
  return encryptData({
    key: derivedKey,
    data: internalKey.toString(),
  })
}
