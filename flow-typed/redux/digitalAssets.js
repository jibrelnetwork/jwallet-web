// @flow strict

declare type DigitalAssetsSortField = 'name' | 'balance'

declare type DigitalAssetsFilterOptions = {|
  +sortBy: DigitalAssetsSortField,
  +sortByNameDirection: SortDirection,
  +sortByBalanceDirection: SortDirection,
  +isHideZeroBalance: boolean,
|}

declare type DigitalAssetType = 'ethereum' | 'erc-20'

declare type DigitalAssetPageUrl = {|
  +url: string,
  +type: string,
|}

declare type DigitalAssetPage = {|
  +urls: DigitalAssetPageUrl[],
  +description: string,
|}

declare type DigitalAssetDisplay = {|
  +digitalAssetsListPriority: number,
  +isDefaultForcedDisplay: boolean,
|}

declare type DigitalAssetPriceFeed = {|
  +currencyIDType: string,
  +currencyID: number,
|}

declare type DigitalAssetBlockchainParamsFeature = 'mintable'

declare type DigitalAssetBlockchainParams = {|
  +features?: DigitalAssetBlockchainParamsFeature[],
  +address: AssetAddress,
  +type: DigitalAssetType,
  +decimals: number,
  +staticGasAmount?: number,
  +deploymentBlockNumber?: number,
|}

declare type DigitalAsset = {|
  +assetPage?: DigitalAssetPage,
  +display?: DigitalAssetDisplay,
  +priceFeed?: DigitalAssetPriceFeed,
  +blockchainParams: DigitalAssetBlockchainParams,
  +name: string,
  +symbol: string,
  +isCustom?: boolean,
  +isActive?: boolean,
  +hasDefaultFields?: boolean,
|}

declare type DigitalAssetWithBalance = {|
  ...DigitalAsset,
  +balance: ?Balance,
|}

declare type DigitalAssets = {
  [AssetAddress]: ?DigitalAsset,
}

declare type DigitalAssetsPersistV1 = {|
  +items: DigitalAssets,
|}

declare type DigitalAssetsPersist = DigitalAssetsPersistV1

declare type DigitalAssetsState = {|
  +persist: DigitalAssetsPersist,
|}

declare type DigitalAssetsGridState = {|
  +filter: DigitalAssetsFilterOptions,
  +searchQuery: string,
|}

declare type SendTransactionProps = {|
  +value: BigNumber,
  +gasLimit?: BigNumber,
  +gasPrice?: BigNumber,
  +to: Address,
  +privateKey: string,
  +nonce?: number,
|}

/**
 * Add custom digital asset
 */
declare type EditAssetFormFields = {|
  +address: string,
  +name: string,
  +symbol: string,
  +decimals: string,
|}

declare type AddAssetState = {|
  +formFields: EditAssetFormFields,
  +invalidFields: EditAssetFormFields,
  +isAssetValid: boolean,
  +isAssetLoaded: boolean,
  +isAssetLoading: boolean,
  +requestedAddress: string,
|}

/**
 * Digital assets manage
 */
declare type DigitalAssetsManageState = {|
  +searchQuery: string,
|}

declare type TXPriorityKey = 'LOW' | 'NORMAL' | 'HIGH' | 'CUSTOM'
declare type TXPriorityValue = 0 | 1 | 1.5 | 2
declare type TXPriority = { [TXPriorityKey]: TXPriorityValue }

declare type TXPriorityData = {|
  +title: string,
  +icon: string,
  +description: string,
|}
