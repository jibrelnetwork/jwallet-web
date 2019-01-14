// @flow

import assetsData from 'data/assets'

function checkJNT(address: AssetAddress): boolean {
  const jntAsset: ?DigitalAsset = assetsData.mainnet
    .find(({ symbol }: DigitalAsset): boolean => (symbol === 'JNT'))

  return jntAsset
    ? (address.toLowerCase() === jntAsset.blockchainParams.address.toLowerCase())
    : false
}

export default checkJNT
