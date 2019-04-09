// @flow

import { t } from 'ttag'

import { WalletInconsistentDataError } from 'errors'

import { checkMnemonicType } from '.'

export function getMnemonicAddressName(
  wallet: Wallet,
  addressName: ?string,
): string {
  const {
    type,
    addressIndex,
  }: Wallet = wallet

  const isMnemonic: boolean = checkMnemonicType(type)
  const index: number = addressIndex + 1

  if (!isMnemonic) {
    throw new WalletInconsistentDataError()
  }

  if (addressName) {
    return addressName
  }

  return `${t`Address`} ${index}`
}
