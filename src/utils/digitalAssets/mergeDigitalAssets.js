// @flow strict

import { getAssetsMainnet } from 'data/assets'
import { getAddressChecksum } from 'utils/address'

export default async function mergeDigitalAssets(items: DigitalAssets): DigitalAssets {
  const itemsMainnet: DigitalAsset[] = await getAssetsMainnet()

  // FIXME: use current network id instead
  const defaultItems: DigitalAssets = itemsMainnet.reduce((
    reduceResult: DigitalAssets,
    item: DigitalAsset,
  ): DigitalAssets => {
    const { address }: DigitalAssetBlockchainParams = item.blockchainParams

    if (!address) {
      return reduceResult
    }

    const addressWithChecksum: AssetAddress = getAddressChecksum(address)

    reduceResult[addressWithChecksum] = {
      ...item,
      isActive: false,
      blockchainParams: {
        ...item.blockchainParams,
        address: addressWithChecksum,
      },
    }

    return reduceResult
  }, {})

  const itemsWithChecksum: DigitalAssets = Object.keys(items).reduce((
    reduceResult: DigitalAssets,
    address: AssetAddress,
  ): DigitalAssets => {
    const addressWithChecksum: AssetAddress = getAddressChecksum(address)
    reduceResult[addressWithChecksum] = items[address]

    return reduceResult
  }, {})

  const existingItems: DigitalAssets = Object.keys(itemsWithChecksum).reduce((
    reduceResult: DigitalAssets,
    addressWithChecksum: AssetAddress,
  ): DigitalAssets => {
    const foundDefaultItem: ?DigitalAsset = defaultItems[addressWithChecksum]
    const foundExistingItem: ?DigitalAsset = itemsWithChecksum[addressWithChecksum]

    // Ignore nonexistent items
    if (!foundExistingItem) {
      return reduceResult
    }

    // Update from default item if it exists
    if (foundDefaultItem) {
      reduceResult[addressWithChecksum] = {
        ...foundExistingItem,
        ...foundDefaultItem,
        isCustom: false,
        isActive: !!foundExistingItem.isActive,
      }

      return reduceResult
    }

    // Remove (ignore) inactive items that are not in default list and not marked as custom
    if (!foundExistingItem.isActive && !foundExistingItem.isCustom) {
      return reduceResult
    }

    // Active items that are not in default list are converted to custom
    reduceResult[addressWithChecksum] = {
      ...foundExistingItem,
      isCustom: true,
    }

    return reduceResult
  }, {})

  return {
    ...defaultItems,
    ...existingItems,
  }
}
