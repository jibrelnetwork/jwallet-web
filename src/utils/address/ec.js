// @flow

import { ec as EC } from 'elliptic'

const ec: {|
  +genKeyPair: () => KeyPair,
  +keyFromPublic: (string, 'hex') => KeyPair,
|} = new EC('secp256k1')

export default ec
