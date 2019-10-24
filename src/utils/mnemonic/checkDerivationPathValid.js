// @flow strict

import bitcore from 'bitcore-lib'

export function checkDerivationPathValid(derivationPath: string): boolean {
  return bitcore.HDPrivateKey.isValidPath(derivationPath)
}
