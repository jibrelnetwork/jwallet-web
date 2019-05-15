// @flow strict

import cryptoJS from 'crypto-js'

import { getAddressChecksum } from '.'

const ENCODER: KeyWordArrayEncoder = cryptoJS.enc.Hex

export function getAddressFromKeyPair(keyPair: KeyPair): string {
  const isCompact: boolean = false
  const publicKey: string = keyPair.getPublic(isCompact, 'hex').slice(2)
  const publicKeyWordArray: KeyWordArray = ENCODER.parse(publicKey)
  const hash: KeyWordArray = cryptoJS.SHA3(publicKeyWordArray, { outputLength: 256 })
  const address: string = hash.toString(ENCODER).slice(24)

  return getAddressChecksum(address)
}
