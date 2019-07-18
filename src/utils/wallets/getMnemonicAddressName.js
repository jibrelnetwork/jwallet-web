// @flow strict

import { i18n } from 'i18n/lingui'

import { WalletInconsistentDataError } from 'errors'

import { checkMultiAddressType } from '.'

export function getMnemonicAddressName(
  {
    customType,
    addressIndex,
  }: Wallet,
  addressName: ?string,
): string {
  if (!checkMultiAddressType(customType)) {
    throw new WalletInconsistentDataError()
  }

  if (addressName) {
    return addressName
  }

  return i18n._(
    'entity.Address.defaultName',
    { index: addressIndex },
    { defaults: 'Address {index}' },
  )
}
