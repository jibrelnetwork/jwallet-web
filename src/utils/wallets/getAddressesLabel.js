// @flow strict

import { t } from 'ttag'

export function getAddressesLabel(derivationIndex: number): string {
  return (derivationIndex % 100) ? t`Addresses` : t`Address`
}
