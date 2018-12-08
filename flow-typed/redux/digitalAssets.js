// @flow

type AssetAddress = string

declare type DigitalAssetsFilterType = {|
  +sortBy: 'name' | 'balance',
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
 * Digital assets manage
 */
declare type DigitalAssetsManageState = {|
  +searchQuery: string,
|}

/**
 * Send asset
 */
declare type DigitalAssetSendStep = '1' | '2'

declare type DigitalAssetSendFormFields = {|
  ownerAddress: string,
  recepientAddress: string,
  assetAddress: string,
  amount: string,
  amountFiat: string,
  priority: string,
  comment: string,
  nonce: string,
  password: string,
|}

declare type DigitalAssetSendState = {|
  step: DigitalAssetSendStep,
  formFields: DigitalAssetSendFormFields,
  invalidFields: DigitalAssetSendFormFields,
  isProcessing: boolean,
|}

// type TransactionPriorityType =
//   'HIGH' |
//   'NORMAL' |
//   'LOW' |
//   'CUSTOM'

// type TransactionPriority = {
//   type: TransactionPriorityType,
//   value: string
// }
