// @flow strict

import { t } from 'ttag'

import {
  generateAddresses,
} from 'utils/mnemonic'

import { type RecipientPickerWallet } from './RecipientPicker'

export function prepareWallets(
  wallets: Wallet[],
  walletBalances: Object = {},
  addressNames: Object = {},
): RecipientPickerWallet[] {
  return wallets.map((wallet) => {
    const {
      xpub,
      isSimplified,
      isReadOnly,
      addressIndex,
    } = wallet

    const derivationIndex = 0

    if (xpub) {
      if (isSimplified) {
        const walletAddresses = generateAddresses(
          xpub,
          addressIndex,
          addressIndex + 1,
        )
        const address = walletAddresses[0]

        return {
          type: 'address',
          addresses: [{
            address,
            name: addressNames[address] || '',
            fiatBalance: undefined,
          }],
          id: wallet.id,
          name: wallet.name,
        }
      } else {
        const walletAddresses = generateAddresses(
          xpub,
          0,
          derivationIndex,
        ).map((address, index) => ({
          address,
          name: addressNames[address] || t`Address ${index + 1}`, // TODO: use function for this
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
          name: addressNames[address] || '',
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
