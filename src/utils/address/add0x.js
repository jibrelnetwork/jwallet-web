// @flow strict

const RE_HEX_PREFIX: RegExp = /^0x/i

export function add0x(data: string): string {
  if (RE_HEX_PREFIX.test(data)) {
    return data
  }

  return `0x${data}`
}
