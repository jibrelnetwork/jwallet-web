// @flow strict

import { i18n } from 'i18n/lingui'

export function getAddressName(
  addressName: ?string,
  addressIndex: number,
  walletName?: string,
) {
  const name: string = addressName || i18n._(
    'entity.address.getAddressName.default',
    { index: addressIndex + 1 },
    { defaults: 'Address {index}' },
  )

  return !walletName ? name : `${walletName} / ${name}`
}
