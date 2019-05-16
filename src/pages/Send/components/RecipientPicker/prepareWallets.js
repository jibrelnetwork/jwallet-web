// @flow strict

import { t } from 'ttag-cli'

import {
  generateAddresses,
} from 'utils/mnemonic'

import { type RecipientPickerWallet } from './RecipientPicker'

export function prepareWallets(
  wallets: Wallet[],
  walletBalances: Object = {},
  walletNames: Object = {},
): RecipientPickerWallet[] {
  return wallets.map((wallet) => {
    const {
      bip32XPublicKey,
      isSimplified,
      isReadOnly,
      addressIndex, // TODO: fix this when will be finished
    } = wallet

    if (bip32XPublicKey) {
      if (isSimplified) {
        const walletAddresses = generateAddresses(
          bip32XPublicKey,
          0,
          1,
        )
        const address = walletAddresses[0]

        return {
          type: 'address',
          addresses: [{
            address,
            name: walletNames[address] || '',
            fiatBalance: undefined,
          }],
          id: wallet.id,
          name: wallet.name,
        }
      } else {
        const walletAddresses = generateAddresses(
          bip32XPublicKey,
          0,
          addressIndex,
        ).map((address, index) => ({
          address,
          name: walletNames[address] || t`Address ${index + 1}`,
          fiatBalance: walletBalances[address],
        }))

        return {
          type: 'mnemonic',
          id: wallet.id,
          addresses: walletAddresses,
          name: wallet.name,
        }
      }
    } else if (isReadOnly && wallet.address) {
      const { address } = wallet

      return {
        type: 'read-only',
        addresses: [{
          address,
          name: walletNames[address] || '',
          fiatBalance: undefined,
        }],
        id: wallet.id,
        name: wallet.name,
      }
    } else {
      return null
    }
  }).filter(Boolean)
}
