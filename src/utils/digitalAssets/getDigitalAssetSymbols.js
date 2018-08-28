// @flow

function getDigitalAssetSymbols(digitalAssets: DigitalAssets): Array<string> {
  return digitalAssets.map(({ symbol }: DigitalAsset): string => symbol)
}

export default getDigitalAssetSymbols
