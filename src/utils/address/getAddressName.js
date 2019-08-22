// @flow strict

import { i18n } from 'i18n/lingui'

export function getAddressName(
  addressName: ?string,
  addressIndex: number,
  walletName?: string,
) {
  const name: string = addressName || i18n._(
    'utils.address.getAddressName.address',
    { index: addressIndex + 1 },
    { defaults: 'Address {index}' },
  )

  return !walletName ? name : i18n._(
    'utils.address.getAddressName.wallet',
    {
      walletName,
      addressName: name,
    },
    { defaults: '{walletName} / {addressName}' },
  )
}
