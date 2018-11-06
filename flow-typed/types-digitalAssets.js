// @flow

/**
 * Digital assets
 */
declare type DigitalAssetsListType = 'balance' | 'popular' | 'custom'

declare type DigitalAsset = {
  +address: Address,
  +symbol: string,
  +name: string,
  +decimals: Decimals,
  +isCustom: boolean,
  +isActive: boolean,
}

declare type DigitalAssetMainDataWithBalance = {
  +address: Address,
  +symbol: string,
  +name: string,
  +balance: number,
}

declare type DigitalAssets = Array<DigitalAsset>

declare type DigitalAssetsData = {
  +invalidFields: FormFields,
  +items: DigitalAssets,
  +foundAssets: Addresses,
  +balances: Balances,
  +searchQuery: string,
  +isInitialised: boolean,
  +isBalancesLoading: boolean,
  +currentAddress: ?Address,
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
