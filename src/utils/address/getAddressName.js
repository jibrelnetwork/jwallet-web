// @flow strict

import { i18n } from 'i18n/lingui'

export function getAddressName(name: ?string, addressIndex: number) {
  const index = addressIndex + 1

  return name || i18n._(
    'entity.Address.defaultName',
    { index },
    { defaults: 'Address {index}' },
  )
}
