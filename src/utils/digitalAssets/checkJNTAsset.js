// @flow

import mainAssets from 'data/assets/main'

function checkJNTAsset(contractAddress: Address): boolean {
  const jntAsset: ?DigitalAsset = mainAssets
    .find(({ symbol }: DigitalAsset): boolean => (symbol === 'JNT'))

  return jntAsset ? (contractAddress === jntAsset.address) : false
}

export default checkJNTAsset
