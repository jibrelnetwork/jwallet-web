// @flow

import assets from 'data/assets'

function getAssetsByNetworkId(networkId: ?NetworkId): DigitalAssets {
  if (!networkId) {
    return []
  }

  switch (networkId) {
    case '1':
      return assets.main

    default:
      return []
  }
}

function getPopularDigitalAssets(networkId: ?NetworkId): DigitalAssets {
  const popularAssets: DigitalAssets = getAssetsByNetworkId(networkId)

  return [assets.ethereum].concat(popularAssets)
}

export default getPopularDigitalAssets
