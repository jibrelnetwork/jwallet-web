// @flow

type OwnerAddress = string
type AssetAddress = string

declare type SortDirection = 'asc' | 'desc'

declare type DigitalAssetsFilterType = {|
  +sortBy: 'name' | 'balance',
  +sortByNameDirection: SortDirection,
  +sortByBalanceDirection: SortDirection,
  +isHideZeroBalance: boolean,
|}

declare type DigitalAssetsBalance = {|
  balance: Bignumber,
  isLoading: boolean,
  isError: boolean,
|}

declare type DigitalAssetsOwnerBalances = {
  [AssetAddress]: DigitalAssetsBalance,
}

type NetworkIdOptional = ?string
type BlockNumberOptional = ?string
declare type DigitalAssetsBalances = {
  [NetworkIdOptional]: {
    [BlockNumberOptional]: {
      [OwnerAddress]: DigitalAssetsOwnerBalances
    }
  }
}

declare type DigitalAsset = {|
  +address: Address,
  +symbol: string,
  +name: string,
  +decimals: Decimals,
  +isCustom?: boolean,
  +isActive?: boolean,
|}

declare type DigitalAssets = {
  [AssetAddress]: DigitalAsset
}

declare type DigitalAssetsState = {|
  +persist: {|
    +items: DigitalAssets,
    +balances: DigitalAssetsBalances,
  |},
|}

declare type DigitalAssetsGridState = {|
  +filter: DigitalAssetsFilterType,
  +searchQuery: string,
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
 * Edit custom digital asset
 */
declare type EditAssetState = {|
  +formFields: EditAssetFormFields,
  +invalidFields: EditAssetFormFields
|}

/**
 * Digital assets manager
 */
declare type DigitalAssetsManagerState = {|
  +searchQuery: string,
|}
