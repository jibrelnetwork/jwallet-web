// @flow

function flattenDigitalAssets(items: DigitalAssets): DigitalAsset[] {
  return Object.keys(items).reduce((result: DigitalAsset[], address: AssetAddress) => {
    const digitalAsset: ?DigitalAsset = items[address]

    if (!digitalAsset) {
      return result
    }

    return [
      ...result,
      digitalAsset,
    ]
  }, [])
}

export default flattenDigitalAssets
