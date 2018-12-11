// @flow

import mainAssets from 'data/assets/main'

function checkJNT(address: AssetAddress): boolean {
  const jntAsset: ?DigitalAsset = mainAssets
    .find(({ symbol }: DigitalAsset): boolean => (symbol === 'JNT'))

  return jntAsset ? (address.toLowerCase() === jntAsset.address.toLowerCase()) : false
}

export default checkJNT
