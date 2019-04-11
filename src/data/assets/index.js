// @flow

import ethereum from './ethereum'

function getAssetsMainnet(): Promise<DigitalAsset[]> {
  return import(/* webpackChunkName: "mainnet" */ '../../../assets/mainnet/assets.json')
    .then(({ default: mainnet }) => mainnet)
}

function getAssetsRopsten(): Promise<DigitalAsset[]> {
  return import(/* webpackChunkName: "ropsten" */ '../../../assets/ropsten/assets.json')
    .then(({ default: ropsten }) => ropsten)
}

export {
  ethereum,
  getAssetsMainnet,
  getAssetsRopsten,
}
