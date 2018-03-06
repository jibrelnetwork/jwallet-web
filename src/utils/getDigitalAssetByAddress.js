import { compose, equals, filter, head, toLower } from 'ramda'

const getDigitalAssetByAddress = (
  assetAddress: Address,
  digitalAssets: DigitalAssets,
): ?DigitalAsset => compose(
  head,
  filter(({ address }: DigitalAsset): boolean => equals(toLower(assetAddress), toLower(address))),
)(digitalAssets)

export default getDigitalAssetByAddress
