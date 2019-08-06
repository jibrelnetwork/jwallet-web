// @flow strict

import { strip0x } from '.'

const RE_HEX_PREFIX: RegExp = /^0x/i
const RE_INVALID_HEX: RegExp = /[^a-f0-9]/i

function checkInvalidHex(value: string): boolean {
  return RE_INVALID_HEX.test(value)
}

export function checkHex(value: string): boolean {
  if (RE_HEX_PREFIX.test(value)) {
    return !checkInvalidHex(strip0x(value))
  }

  return !checkInvalidHex(value)
}
