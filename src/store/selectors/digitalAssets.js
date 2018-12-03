// @flow

export function selectDigitalAssets(state: AppState): DigitalAssets {
  const {
    digitalAssets: {
      persist: {
        items,
      },
    },
  } = state

  return items
}

export function selectDigitalAssetsPersist(state: AppState): DigitalAssetsPersist {
  return state.digitalAssets.persist
}

export function selectDigitalAssetsItems(state: AppState): DigitalAssets {
  const digitalAssetsPersist: DigitalAssetsPersist = selectDigitalAssetsPersist(state)

  return digitalAssetsPersist.items
}

export function selectDigitalAsset(state: AppState, contractAddress: Address): ?DigitalAsset {
  const items = selectDigitalAssets(state)
  if (items[contractAddress]) {
    return items[contractAddress]
  }

  const addressLower = contractAddress.toLowerCase()
  const key = Object.keys(items).find(addr => items[addr].address.toLowerCase() === addressLower)
  return key ? items[key] : null
}

export function selectActiveDigitalAssets(state: AppState): Array<DigitalAsset> {
  const allAssets = selectDigitalAssets(state)
  return Object.keys(allAssets).map(address => allAssets[address]).filter(asset => asset.isActive)
}

export function selectDigitalAssetsGridFilters(state: AppState): DigitalAssetsFilterType {
  return state.digitalAssetsGrid.filter
}

export function selectDigitalAssetsGridSearchQuery({ digitalAssetsGrid }: AppState): string {
  return digitalAssetsGrid.searchQuery
}

export function selectDigitalAssetsManageSearchQuery({ digitalAssetsManage }: AppState): string {
  return digitalAssetsManage.searchQuery
}

export function selectAddAsset(state: AppState): AddAssetState {
  return state.addAsset
}

export function selectEditAsset(state: AppState): EditAssetState {
  return state.editAsset
}

export function selectDigitalAssetsSend(state: AppState): DigitalAssetSendState {
  return state.digitalAssetsSend
}
