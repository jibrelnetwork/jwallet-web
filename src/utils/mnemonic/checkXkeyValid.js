// @flow strict

import bitcore from 'bitcore-lib'

const XKEY_LENGTH: number = 111
const RE_INVALID_SYMBOLS: RegExp = /[^a-z1-9]/i

export function checkXkeyValid(xKey: string, type: 'prv' | 'pub'): boolean {
  if (!xKey || (xKey.length !== XKEY_LENGTH) || !xKey.includes(`x${type}`)) {
    return false
  }

  const rePrefix: RegExp = new RegExp(`^x${type}`, 'i')
  const cleanedXKey: string = xKey.replace(rePrefix, '')
  const hasInvalidSymbols: boolean = RE_INVALID_SYMBOLS.test(cleanedXKey)

  if (hasInvalidSymbols) {
    return false
  }

  try {
    if (type === 'prv') {
      bitcore.HDPrivateKey(xKey)
    } else if (type === 'pub') {
      bitcore.HDPublicKey(xKey)
    }
  } catch (error) {
    return false
  }

  return true
}
