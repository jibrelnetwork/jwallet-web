// @flow

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

/*
declare type DigitalAsset = {|
  +address: Address,
  +symbol: string,
  +name: string,
  +decimals: Decimals,
  +isCustom?: boolean,
  +isActive?: boolean,
|}
*/

declare type DigitalAsset = {|
  +assetPage?: DigitalAssetPage,
  +display?: DigitalAssetDisplay,
  +priceFeed?: DigitalAssetPriceFeed,
  +blockchainParams: DigitalAssetBlockchainParams,
  +name: string,
  +symbol: string,
  +isCustom?: boolean,
  +isActive?: boolean,
|}

declare type DigitalAssetWithBalance = {|
  +balance: ?Balance,
  +assetPage: DigitalAssetPage,
  +display: DigitalAssetDisplay,
  +priceFeed: DigitalAssetPriceFeed,
  +blockchainParams: DigitalAssetBlockchainParams,
  +name: string,
  +symbol: string,
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

/**
 * Send asset
 */
declare type DigitalAssetsSendFormStepIndex = 0
declare type DigitalAssetsSendConfirmStepIndex = 1

declare type DigitalAssetsSendStepIndex =
  DigitalAssetsSendFormStepIndex |
  DigitalAssetsSendConfirmStepIndex

declare type DigitalAssetsSendSteps = {|
  +FORM: DigitalAssetsSendFormStepIndex,
  +CONFIRM: DigitalAssetsSendConfirmStepIndex,
|}

declare type TXPriorityKey = 'LOW' | 'NORMAL' | 'HIGH' | 'CUSTOM'
declare type TXPriorityValue = 0 | 1 | 1.5 | 2
declare type TXPriority = { [TXPriorityKey]: TXPriorityValue }

declare type TXPriorityData = {|
  +title: string,
  +icon: string,
  +description: string,
|}

declare type DigitalAssetsSendFormFields = {|
  +nonce: string,
  +amount: string,
  +comment: string,
  +gasLimit: string,
  +gasPrice: string,
  +password: string,
  +amountFiat: string,
  +recipient: Address,
  +assetAddress: AssetAddress,
|}

declare type DigitalAssetsSendState = {|
  +formFieldValues: DigitalAssetsSendFormFields,
  +formFieldErrors: DigitalAssetsSendFormFields,
  +priority: TXPriorityKey,
  +currentStep: DigitalAssetsSendStepIndex,
  +isLoading: boolean,
|}

declare type SendTransactionProps = {|
  +value: BigNumber,
  gasLimit?: BigNumber,
  gasPrice?: BigNumber,
  +to: Address,
  +privateKey: string,
  nonce?: number,
|}

declare type DigitalAssetsSendRouteParams = {|
  +to?: string,
  +gas?: string,
  +nonce?: string,
  +asset?: string,
  +amount?: string,
  +comment?: string,
  +gasPrice?: string,
|}
