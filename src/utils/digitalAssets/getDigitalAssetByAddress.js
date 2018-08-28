// @flow

function checkAddressEqual(address: Address, comparable: Address): boolean {
  return (address === comparable.toLowerCase())
}

function getDigitalAssetByAddress(
  assetAddress: ?Address,
  digitalAssets: ?DigitalAssets,
): ?DigitalAsset {
  if (!(assetAddress && digitalAssets)) {
    return null
  }

  const assetAddressLower: Address = assetAddress.toLowerCase()

  return digitalAssets
    .find(({ address }: DigitalAsset): boolean => checkAddressEqual(assetAddressLower, address))
}

export default getDigitalAssetByAddress
