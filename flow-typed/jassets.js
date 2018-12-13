// @flow

declare type JAssets = {|
  name: string,
  symbol: string,
  blockchainParams: {|
    decimals: Decimals,
    address: ?Address,
    features?: string[],
    staticGasAmount: number,
    deploymentBlockNumber: number,
  |},
  display: {|
    isDefaultForcedDisplay: boolean,
    digitalAssetsListPriority: number,
  |},
  priceFeed?: {
    currencyID: number,
  },
|}
