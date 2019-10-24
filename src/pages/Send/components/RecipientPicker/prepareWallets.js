// @flow strict

import { getAddressName } from 'utils/address'
import { generateAddresses } from 'utils/mnemonic'

export function prepareWallets(
  items: Wallet[],
  walletBalances: Object = {},
  addressNames: AddressNames = {},
): RecipientPickerWallet[] {
  return items.map((item: Wallet): ?RecipientPickerWallet => {
    const {
      id,
      name,
      xpub,
      address,
      isSimplified,
      addressIndex,
      derivationIndex,
    } = item

    if (xpub) {
      if (isSimplified) {
        const firstAddress = generateAddresses(
          xpub,
          addressIndex,
          addressIndex + 1,
        )

        return {
          id,
          name,
          type: 'address',
          addresses: [{
            fiatBalance: undefined,
            address: firstAddress[0],
            name: addressNames[firstAddress[0]] || '',
          }],
        }
      } else {
        const walletAddresses = generateAddresses(
          xpub,
          0,
          derivationIndex,
        ).map((
          addr: Address,
          index: number,
        ): RecipientPickerWalletAddress => ({
          address: addr,
          fiatBalance: walletBalances[addr],
          name: getAddressName(
            addressNames[addr],
            index,
          ),
        }))

        return {
          id,
          name,
          type: 'mnemonic',
          addresses: walletAddresses,
        }
      }
    } else if (address) {
      return {
        id,
        name,
        type: 'read-only',
        addresses: [{
          address,
          fiatBalance: undefined,
          name: addressNames[address] || '',
        }],
      }
    } else {
      return null
    }
  }).filter(Boolean)
}
