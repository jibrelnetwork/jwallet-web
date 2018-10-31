// @flow

/**
 * Digital assets
 */
type OwnerAddress = string
type AssetAddress = string

declare type DigitalAssetsFilter = {|
  +sortBy: 'name' | 'balance',
  +sortByNameOrder: 'asc' | 'desc',
  +sortByBalaceOrder: 'asc' | 'desc',
  +myAssetsFirst: boolean,
  +hideZeroBalance: boolean,
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
  +filter: DigitalAssetsFilter,
  +searchQuery: string,
}

/**
 * Custom digital asset
 */
declare type CustomAssetFormFields = {|
  +address: string,
  +name: string,
  +symbol: string,
  +decimals: string,
|}

declare type CustomAssetState = {
  +invalidFields: CustomAssetFormFields,
  +formFields: CustomAssetFormFields,
  +isAssetValid: boolean,
  +isAssetLoaded: boolean,
  +isAssetLoading: boolean,
  +requestedAddress: string,
}
