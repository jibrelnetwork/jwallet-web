// @flow

import Keystore from 'jwallet-web-keystore'

import { InvalidFieldError } from './errors'

type DerivationPathData = {
  customDerivationPath: string,
  knownDerivationPath: string,
}

const validateDerivationPath = (data: DerivationPathData): void => {
  const derivationPath: string = data.customDerivationPath || data.knownDerivationPath

  if (Keystore.isDerivationPathValid(derivationPath)) {
    return
  }

  throw new InvalidFieldError('customDerivationPath', i18n('general.error.derivationPath.invalid'))
}

export default validateDerivationPath
