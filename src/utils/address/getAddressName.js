// @flow strict

import { t } from 'ttag'

export function getAddressName(name: ?string, addressIndex: number) {
  return name || t`Address ${addressIndex + 1}`
}
