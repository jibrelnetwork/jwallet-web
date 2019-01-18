// @flow

import bitcore from 'bitcore-lib'

function checkDerivationPathValid(derivationPath: string): boolean {
  return bitcore.HDPrivateKey.isValidPath(derivationPath)
}

export default checkDerivationPathValid
