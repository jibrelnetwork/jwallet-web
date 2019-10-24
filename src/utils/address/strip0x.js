// @flow strict

const RE_HEX_PREFIX: RegExp = /^0x/i

export function strip0x(data: string): string {
  return data.replace(RE_HEX_PREFIX, '')
}
