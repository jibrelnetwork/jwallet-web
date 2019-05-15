// @flow strict

import { ec as EC } from 'elliptic'

export const ec: {|
  +genKeyPair: () => KeyPair,
  +keyFromPublic: (string, 'hex') => KeyPair,
|} = new EC('secp256k1')
