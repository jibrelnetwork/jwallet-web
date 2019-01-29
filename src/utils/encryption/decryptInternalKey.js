// @flow

import config from 'config'

import {
  getNonce,
  decryptData,
} from '.'

function decryptInternalKey(
  internalKey: ?EncryptedData,
  derivedKey: Uint8Array,
  encryptionType: string,
): Uint8Array {
  if (!internalKey) {
    return getNonce(config.defaultDerivationKeyLength)
  }

  const key: string = decryptData({
    encryptionType,
    key: derivedKey,
    data: internalKey,
  })

  return new Uint8Array(key.split(',').map(i => parseInt(i, 10)))
}

export default decryptInternalKey
