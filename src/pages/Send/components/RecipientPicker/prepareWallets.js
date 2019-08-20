// @flow strict

import { generateAddresses } from 'utils/mnemonic'
import { getAddressName } from 'utils/address'

export function prepareWallets(
  wallets: Wallet[],
  walletBalances: Object = {},
  addressNames: Object = {},
): RecipientPickerWallet[] {
  return wallets.map((wallet) => {
    const {
      xpub,
      isSimplified,
      addressIndex,
      derivationIndex,
    } = wallet

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
          name: getAddressName(addressNames[address], index),
          fiatBalance: walletBalances[address],
        }))

        return {
          type: 'mnemonic',
          id: wallet.id,
          addresses: walletAddresses,
          name: wallet.name,
        }
      }
    } else if (wallet.address) {
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
