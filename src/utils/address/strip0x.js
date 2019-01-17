// @flow

const RE_HEX_PREFIX: RegExp = /^0x/i

function strip0x(data: string): string {
  return data.replace(RE_HEX_PREFIX, '')
}

export default strip0x
