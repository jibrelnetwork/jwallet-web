// @flow strict

import { WalletInconsistentDataError } from 'errors'

import {
  checkAddressValid,
  checkPrivateKeyValid,
} from 'utils/address'

import {
  checkXkeyValid,
  checkMnemonicValid,
} from 'utils/mnemonic'

import {
  prepareXPUBWallet,
  prepareAddressWallet,
  prepareMnemonicWallet,
  prepareXPRVWallet,
  preparePrivateKeyWallet,
} from '.'

export function prepareWallet(
  walletData: WalletNewData,
  internalKey: ?Uint8Array,
): Wallet {
  const { data }: WalletNewData = walletData

  if (!internalKey) {
    if (checkXkeyValid(data, 'pub')) {
      return prepareXPUBWallet(walletData)
    } else if (checkAddressValid(data)) {
      return prepareAddressWallet(walletData)
    }
  } else if (checkMnemonicValid(data)) {
    return prepareMnemonicWallet(
      walletData,
      internalKey,
    )
  } else if (checkXkeyValid(data, 'prv')) {
    return prepareXPRVWallet(
      walletData,
      internalKey,
    )
  } else if (checkPrivateKeyValid(data)) {
    return preparePrivateKeyWallet(
      walletData,
      internalKey,
    )
  }

  throw new WalletInconsistentDataError('createWallet data error')
}
