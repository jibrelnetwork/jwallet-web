// @flow

/**
 * Transformation map:
 *  source.name -> target.name,
 *  source.symbol -> target.symbol,
 *  source.blockchainParams.decimals -> target.decimals,
 *  source.blockchainParams.address -> target.address,
 *  source.display.isDefaultForcedDisplay -> target.isActive,
 *  source.blockchainParams.features -> target.blockchainParams.features
 *  source.blockchainParams.staticGasAmount -> target.blockchainParams.staticGasAmount
 *  source.blockchainParams.deploymentBlockNumber -> target.blockchainParams.deploymentBlockNumber
 *  source.priceFeed.currencyID -> target.priceFeed.currencyID
 *
 *  sortBy:
 *    source.display.digitalAssetsListPriority
 */

function transformation(list: JAssets[], customAssetsList: string[]): DigitalAsset[] {
  return list.reduce((acc, asset) => {
    const {
      name,
      symbol,
      blockchainParams: {
        decimals,
        address,
        // features,
        // staticGasAmount,
        // deploymentBlockNumber,
      },
      display: {
        isDefaultForcedDisplay,
        // digitalAssetsListPriority,
      },
      // priceFeed,
    } = asset

    if (!address) {
      return acc
    }

    return [...acc, {
      name,
      symbol,
      decimals,
      address,
      isActive: isDefaultForcedDisplay,
      isCustom: (customAssetsList.indexOf(address) > -1),
      // blockchainParams: {
      //   features,
      //   staticGasAmount,
      //   deploymentBlockNumber,
      // },
      // display: {
      //   digitalAssetsListPriority,
      // },
      // priceFeed: {
      //   currencyID: priceFeed ? priceFeed.currencyID : null,
      // },
    }]
  }, [])
}

export default transformation
