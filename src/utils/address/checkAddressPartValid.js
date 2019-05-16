// @flow strict

import {
  add0x,
} from '.'

export function checkAddressPartValid(address: string): boolean {
  const addr0x: string = add0x(address)

  const isAddressLowerCase: boolean = /^0x[0-9a-f]{1,40}$/.test(addr0x)
  const isAddressUpperCase: boolean = /^0(x|X)[0-9A-F]{1,40}$/.test(addr0x)

  return (isAddressLowerCase || isAddressUpperCase)
}
