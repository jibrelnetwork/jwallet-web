// @flow

import { isEmpty } from 'ramda'

import config from 'config'

import getDigitalAssetByAddress from './getDigitalAssetByAddress'

const getAssetDecimals = (assetAddress: ?Address, digitalAssets: ?DigitalAssets): Decimals => {
  if (!assetAddress || !digitalAssets || isEmpty(digitalAssets)) {
    return config.defaultDecimals
  }

  const asset: ?DigitalAsset = getDigitalAssetByAddress(assetAddress, digitalAssets)

  return (asset && asset.decimals) ? asset.decimals : config.defaultDecimals
}

export default getAssetDecimals
