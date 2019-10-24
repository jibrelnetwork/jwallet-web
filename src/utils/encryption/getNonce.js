// @flow

import nacl from 'tweetnacl'

const DEFAULT_NONCE_LENGTH: number = 32

export function getNonce(nonceLength: number = DEFAULT_NONCE_LENGTH): Uint8Array {
  return nacl.randomBytes(nonceLength)
}
