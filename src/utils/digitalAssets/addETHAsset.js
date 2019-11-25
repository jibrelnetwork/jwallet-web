// @flow strict

import {
  ethereum,
  getAssetsMainnet,
} from 'data/assets'

export default async function addETHAsset(items: DigitalAssets): DigitalAssets {
  const itemsMainnet: DigitalAsset[] = await getAssetsMainnet()
  const defaultETHAddress: AssetAddress = ethereum.blockchainParams.address

  const foundETHAsset: ?DigitalAsset = itemsMainnet
    .find((item: DigitalAsset) => (item.blockchainParams.type === 'ethereum'))

  if (!foundETHAsset) {
    return {
      ...items,
      [defaultETHAddress]: ethereum,
    }
  }

  const { blockchainParams }: DigitalAsset = foundETHAsset

  return {
    ...items,
    [defaultETHAddress]: {
      ...foundETHAsset,
      blockchainParams: {
        ...blockchainParams,
        address: defaultETHAddress,
      },
      isActive: true,
    },
  }
}
