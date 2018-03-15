// @flow

import { prepend } from 'ramda'

import assets from 'data/assets'

const networksNamesMap: { [?string]: ?string } = {
  '1': 'main',
}

const getPopularDigitalAssets = (networkId: ?NetworkId): DigitalAssets => {
  const networkName: ?string = networksNamesMap[networkId]
  const popularAssets: DigitalAssets = assets[networkName] || []

  return prepend(assets.ethereum)(popularAssets)
}

export default getPopularDigitalAssets
