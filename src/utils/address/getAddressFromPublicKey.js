// @flow strict

import { ec } from './ec'
import { getAddressFromKeyPair } from '.'

export function getAddressFromPublicKey(publicKey: string): string {
  const keyPair: KeyPair = ec.keyFromPublic(publicKey, 'hex')

  return getAddressFromKeyPair(keyPair)
}
