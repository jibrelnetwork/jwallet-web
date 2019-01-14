// @flow

import ec from './ec'
import getAddressFromKeyPair from './getAddressFromKeyPair'

function getAddressFromPublicKey(publicKey: string): string {
  const keyPair: KeyPair = ec.keyFromPublic(publicKey, 'hex')

  return getAddressFromKeyPair(keyPair)
}

export default getAddressFromPublicKey
