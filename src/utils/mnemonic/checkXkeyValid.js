// @flow strict

const XKEY_LENGTH: number = 111
const RE_INVALID_SYMBOLS: RegExp = /[^a-z1-9]/i

export function checkXkeyValid(xKey: string, type: 'prv' | 'pub'): boolean {
  if (!xKey || (xKey.length !== XKEY_LENGTH)) {
    return false
  }

  if ((type === 'prv') && !xKey.includes(type)) {
    return false
  } else if ((type === 'pub') && !xKey.includes(type)) {
    return false
  }

  const rePrefix: RegExp = new RegExp(`^x${type}`, 'i')
  const cleanedXKey: string = xKey.replace(rePrefix, '')
  const hasInvalidSymbols: boolean = RE_INVALID_SYMBOLS.test(cleanedXKey)

  return !hasInvalidSymbols
}
