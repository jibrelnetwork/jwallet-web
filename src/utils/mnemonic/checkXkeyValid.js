// @flow strict

const XKEY_LENGTH: number = 111

export function checkXkeyValid(xKey: string, type: 'prv' | 'pub'): boolean {
  if (!xKey || (xKey.length !== XKEY_LENGTH)) {
    return false
  }

  const rePrefix: RegExp = new RegExp(`^x${type}`, 'i')
  const cleanedXKey: string = xKey.replace(rePrefix, '')
  const hasInvalidSymbols: boolean = /[^a-z1-9]/i.test(cleanedXKey)

  return !hasInvalidSymbols
}
