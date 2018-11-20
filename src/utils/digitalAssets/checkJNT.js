// @flow

import mainAssets from 'data/assets/main'

function checkJNT(contractAddress: Address): boolean {
  const jntAsset: ?DigitalAsset = mainAssets
    .find(({ symbol }: DigitalAsset): boolean => (symbol === 'JNT'))

  return jntAsset ? (contractAddress.toLowerCase() === jntAsset.address.toLowerCase()) : false
}

export default checkJNT
