// @flow

import checkAddressWithChecksumValid from './checkAddressWithChecksumValid'

function checkNormalizedAddress(address: string): boolean {
  const isAddressLowerCase: boolean = /^0x[0-9a-f]{40}$/.test(address)
  const isAddressUpperCase: boolean = /^0x[0-9A-F]{40}$/.test(address)

  return (isAddressLowerCase || isAddressUpperCase)
}

function checkAddressValid(address: string): boolean {
  return checkNormalizedAddress(address) || checkAddressWithChecksumValid(address)
}

export default checkAddressValid
