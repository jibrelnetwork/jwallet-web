// @flow

declare type DigitalAssetsSortField = 'name' | 'balance'

declare type DigitalAssetsFilterOptions = {|
  +sortBy: DigitalAssetsSortField,
  +sortByNameDirection: SortDirection,
  +sortByBalanceDirection: SortDirection,
  +isHideZeroBalance: boolean,
|}

declare type DigitalAsset = {|
  +address: Address,
  +symbol: string,
  +name: string,
  +decimals: Decimals,
  +isCustom?: boolean,
  +isActive?: boolean,
|}

declare type DigitalAssetWithBalance = {|
  +balance: ?Balance,
  +address: Address,
  +symbol: string,
  +name: string,
  +decimals: Decimals,
  +isCustom?: boolean,
  +isActive?: boolean,
|}

declare type DigitalAssets = {
  [AssetAddress]: ?DigitalAsset
}

declare type DigitalAssetsPersist = {|
  +items: DigitalAssets,
|}

declare type DigitalAssetsState = {|
  +persist: DigitalAssetsPersist,
|}

declare type DigitalAssetsGridState = {|
  +filter: DigitalAssetsFilterOptions,
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
 * Digital assets manage
 */
declare type DigitalAssetsManageState = {|
  +searchQuery: string,
|}
