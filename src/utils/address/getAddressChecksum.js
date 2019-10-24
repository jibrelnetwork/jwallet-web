// @flow strict

import cryptoJS from 'crypto-js'

import {
  add0x,
  strip0x,
} from '.'

const ENCODER: KeyWordArrayEncoder = cryptoJS.enc.Hex

export function getAddressChecksum(address: string): string {
  const addressLowerCase: string = strip0x(address).toLowerCase()
  const hash: string = cryptoJS.SHA3(addressLowerCase, { outputLength: 256 }).toString(ENCODER)

  const checksum: string = addressLowerCase
    .split('')
    .map((
      symbol: string,
      index: number,
    ) => ((parseInt(hash[index], 16) >= 8) ? symbol.toUpperCase() : symbol))
    .join('')

  return add0x(checksum)
}
