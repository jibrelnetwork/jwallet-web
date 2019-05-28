// @flow strict

import { t } from 'ttag'

import { checkDerivationPathValid } from 'utils/mnemonic'

export function validateDerivationPath(derivationPath: ?string): ?string {
  return (!derivationPath || checkDerivationPathValid(derivationPath))
    ? null
    : t`Derivation path is not valid`
}
