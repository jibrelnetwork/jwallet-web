// @flow strict

import {
  add0x,
} from '.'

const CHECK_ADDRESS_VALID_LC = /^0x[0-9a-f]{1,40}$/

export function checkAddressPartValid(address: string) {
  const addr0x: string = add0x(address)

  const isAddressLowerCase = CHECK_ADDRESS_VALID_LC.test(addr0x.toLowerCase())

  return isAddressLowerCase
}
