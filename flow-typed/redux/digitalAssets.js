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
  +recepient: Address,
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
  +to: Address,
  +gas: string,
  +nonce: string,
  +value: string,
  +gasPrice: string,
  +privateKey: string,
|}

declare type DigitalAssetsSendRouteParams = {|
  +to?: string,
  +asset?: string,
  +txhash?: string,
|}
