// @flow strict

import { i18n } from 'i18n/lingui'

import { checkDerivationPathValid } from 'utils/mnemonic'

export function validateDerivationPath(derivationPath: ?string): ?string {
  return (!derivationPath || checkDerivationPathValid(derivationPath))
    ? null
    : i18n._(
      'Wallets.errors.derivationPathInvalid',
      null,
      { defaults: 'Derivation path is not valid' },
    )
}
