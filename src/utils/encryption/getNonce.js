// @flow

import nacl from 'tweetnacl'

function getNonce(nonceLength: number): Uint8Array {
  return nacl.randomBytes(nonceLength)
}

export default getNonce
