// @flow strict

import { t } from 'ttag'

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

  return `${t`Address`} ${addressIndex + 1}`
}
