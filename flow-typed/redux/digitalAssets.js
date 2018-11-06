// @flow

type OwnerAddress = string
type AssetAddress = string

declare type SortOrder = 'asc' | 'desc'

declare type DigitalAssetsFilter = {|
  +sortBy: 'name' | 'balance',
  +sortByNameOrder: SortOrder,
  +sortByBalanceOrder: SortOrder,
  +isMyAssetsFirst: boolean,
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

type _NetworkId = ?string
type _BlockNumber = ?string
declare type DigitalAssetsBalances = {
  [_NetworkId]: {
    [_BlockNumber]: {
      [OwnerAddress]: DigitalAssetsOwnerBalances
    }
  }
}

declare type DigitalAsset = {|
  +address: Address,
  +symbol: string,
  +name: string,
  +decimals: Decimals,
  +isCustom: boolean,
  +isActive: boolean,
|}

declare type DigitalAssets = {
  [AssetAddress]: DigitalAsset
}

declare type DigitalAssetsState = {
  +persist: {|
    +items: DigitalAssets,
    +balances: DigitalAssetsBalances,
  |},
}

declare type DigitalAssetsGridState = {|
  +filter: DigitalAssetsFilter,
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

declare type AddAssetState = {
  +formFields: EditAssetFormFields,
  +invalidFields: EditAssetFormFields,
  +isAssetValid: boolean,
  +isAssetLoaded: boolean,
  +isAssetLoading: boolean,
  +requestedAddress: string,
}

/**
 * Edit custom digital asset
 */
declare type EditAssetState = {
  +formFields: EditAssetFormFields,
  +invalidFields: EditAssetFormFields
}
