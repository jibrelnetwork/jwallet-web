// @flow strict

export function getAssetsMainnet(): Promise<DigitalAsset[]> {
  return import(/* webpackChunkName: "mainnet" */ '../../../assets/mainnet/assets.json')
    .then(({ default: mainnet }) => mainnet)
}

export function getAssetsRopsten(): Promise<DigitalAsset[]> {
  return import(/* webpackChunkName: "ropsten" */ '../../../assets/ropsten/assets.json')
    .then(({ default: ropsten }) => ropsten)
}
