// @flow

import flattenDigitalAssets from 'utils/digitalAssets/flattenDigitalAssets'
import { DigitalAssetNotFoundError } from 'errors'

export function selectDigitalAssets(state: AppState): DigitalAssetsState {
  return state.digitalAssets
}

export function selectDigitalAssetsPersist(state: AppState): DigitalAssetsPersist {
  const digitalAssets: DigitalAssetsState = selectDigitalAssets(state)

  return digitalAssets.persist
}

export function selectDigitalAssetsItems(state: AppState): DigitalAssets {
  const digitalAssetsPersist: DigitalAssetsPersist = selectDigitalAssetsPersist(state)

  return digitalAssetsPersist.items
}

export function selectDigitalAsset(state: AppState, assetAddress: AssetAddress): ?DigitalAsset {
  const items: DigitalAssets = selectDigitalAssetsItems(state)
  const flattenedItems: DigitalAsset[] = flattenDigitalAssets(items)
  const assetAddressLower: string = assetAddress.toLowerCase()

  return flattenedItems.find((
    { blockchainParams }: DigitalAsset,
  ): boolean => (blockchainParams.address.toLowerCase() === assetAddressLower))
}

export function selectDigitalAssetOrThrow(
  state: AppState,
  assetAddress: AssetAddress,
): DigitalAsset {
  const asset = selectDigitalAsset(state, assetAddress)

  if (!asset) {
    throw new DigitalAssetNotFoundError({ address: assetAddress })
  }

  return asset
}

export function selectActiveDigitalAssets(state: AppState): DigitalAsset[] {
  const items: DigitalAssets = selectDigitalAssetsItems(state)
  const flattenedItems: DigitalAsset[] = flattenDigitalAssets(items)

  return flattenedItems.filter(({ isActive }: DigitalAsset): boolean => !!isActive)
}

export function selectCustomDigitalAssets(state: AppState): DigitalAsset[] {
  const items: DigitalAssets = selectDigitalAssetsItems(state)
  const flattenedItems: DigitalAsset[] = flattenDigitalAssets(items)

  return flattenedItems.filter(({ isCustom }: DigitalAsset): boolean => !!isCustom)
}

export function selectDigitalAssetsGridFilters(state: AppState): DigitalAssetsFilterOptions {
  return state.digitalAssetsGrid.filter
}

export function selectDigitalAssetsGridSearchQuery({ digitalAssetsGrid }: AppState): string {
  return digitalAssetsGrid.searchQuery
}

export function selectDigitalAssetsManageSearchQuery({ digitalAssetsManage }: AppState): string {
  return digitalAssetsManage.searchQuery
}

export function selectAddAsset(state: AppState): AddAssetState {
  return state.digitalAssetsAdd
}

export function selectEditAsset(state: AppState): EditAssetState {
  return state.digitalAssetsEdit
}

export function selectDigitalAssetsSend(state: AppState): DigitalAssetsSendState {
  return state.digitalAssetsSend
}
