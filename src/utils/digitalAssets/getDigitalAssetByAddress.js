// @flow

import { compose, equals, filter, head, toLower } from 'ramda'

const getDigitalAssetByAddress = (
  assetAddress: ?Address,
  digitalAssets: DigitalAssets,
): ?DigitalAsset => {
  if (!(assetAddress && digitalAssets.length)) {
    return null
  }

  const lowerAssetAddress: Address = toLower(assetAddress)

  return compose(
    head,
    filter(({ address }: DigitalAsset): boolean => equals(lowerAssetAddress, toLower(address))),
  )(digitalAssets)
}

export default getDigitalAssetByAddress
