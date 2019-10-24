// @flow strict

import {
  add0x,
  getAddressChecksum,
} from '.'

export function checkNormalizedAddress(address: string): boolean {
  const addr0x: string = add0x(address)

  const isAddressLowerCase: boolean = /^0x[0-9a-f]{40}$/.test(addr0x)
  const isAddressUpperCase: boolean = /^0(x|X)[0-9A-F]{40}$/.test(addr0x)

  return (isAddressLowerCase || isAddressUpperCase)
}

export function checkAddressWithChecksumValid(address: string): boolean {
  const addr0x: string = add0x(address)

  return (/^0x[0-9a-fA-F]{40}$/i.test(addr0x) && (getAddressChecksum(addr0x) === addr0x))
}

export function checkAddressValid(address: string): boolean {
  return checkNormalizedAddress(address) || checkAddressWithChecksumValid(address)
}
