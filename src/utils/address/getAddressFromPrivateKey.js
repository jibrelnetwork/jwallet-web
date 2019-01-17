// @flow

import {
  strip0x,
  getAddressFromKeyPair,
} from '.'

import ec from './ec'

function getAddressFromPrivateKey(privateKey: string): string {
  const keyPair: KeyPair = ec.genKeyPair()
  keyPair._importPrivate(strip0x(privateKey), 'hex')

  return getAddressFromKeyPair(keyPair)
}

export default getAddressFromPrivateKey
