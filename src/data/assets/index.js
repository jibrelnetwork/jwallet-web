// @flow

import { getAddressChecksum } from 'utils/address'

import ethereum from './ethereum'
import rawMainnet from '../../../assets/mainnet/assets.json'
import rawRopsten from '../../../assets/ropsten/assets.json'

// FIXME: this should be added one-time during build of the assets list
const addChecksum = (asset) => {
  if (asset.blockchainParams && asset.blockchainParams.address) {
    return {
      ...asset,
      blockchainParams: {
        ...asset.blockchainParams,
        address: getAddressChecksum(asset.blockchainParams.address),
      },
    }
  }

  return asset
}

export default {
  mainnet: rawMainnet.map(asset => addChecksum(asset)),
  ropsten: rawRopsten.map(asset => addChecksum(asset)),
  ethereum,
}
