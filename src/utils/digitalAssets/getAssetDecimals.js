// @flow

import config from 'config'

import getDigitalAssetByAddress from './getDigitalAssetByAddress'

function getAssetDecimals(assetAddress: ?Address, digitalAssets: ?DigitalAssets): Decimals {
  const asset: ?DigitalAsset = getDigitalAssetByAddress(assetAddress, digitalAssets)

  return asset ? asset.decimals : config.defaultDecimals
}

export default getAssetDecimals
