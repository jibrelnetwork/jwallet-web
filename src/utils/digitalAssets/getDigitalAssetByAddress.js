// @flow

function getDigitalAssetByAddress<T: DigitalAsset | DigitalAssetWithBalance>(
  items: T[],
  address: AssetAddress,
): ?T {
  const addressToLower: string = address.toLowerCase()

  return items.find((item: T): boolean => {
    const assetAddress: AssetAddress = item.blockchainParams.address

    return (assetAddress.toLowerCase() === addressToLower)
  })
}

export default getDigitalAssetByAddress
