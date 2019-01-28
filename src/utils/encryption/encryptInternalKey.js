// @flow

import encryptData from './encryptData'

function encryptInternalKey(
  internalKey: Uint8Array,
  derivedKey: Uint8Array,
  encryptionType: string,
): EncryptedData {
  return encryptData({
    encryptionType,
    key: derivedKey,
    data: internalKey.toString(),
  })
}

export default encryptInternalKey
