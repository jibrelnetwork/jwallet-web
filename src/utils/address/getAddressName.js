// @flow strict

import { t } from 'ttag'

export function getAddressName(name: ?string, index: ?number) {
  const addressIndex: number = ((index || 0) + 1)

  return name || t`Address ${addressIndex}`
}
