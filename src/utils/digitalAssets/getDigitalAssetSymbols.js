// @flow

const getDigitalAssetSymbols = (digitalAssets: DigitalAssetsData): Array<string> => {
  return digitalAssets.items.map(({ symbol }) => symbol)
}

export default getDigitalAssetSymbols
