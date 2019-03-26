// @flow

function checkJNT(address: AssetAddress, assets: DigitalAsset[]): boolean {
  const jntAsset: ?DigitalAsset = assets
    .find(({ symbol }: DigitalAsset): boolean => (symbol === 'JNT'))

  return jntAsset
    ? (address.toLowerCase() === jntAsset.blockchainParams.address.toLowerCase())
    : false
}

export default checkJNT
