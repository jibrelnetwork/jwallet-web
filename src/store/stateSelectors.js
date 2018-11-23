// @flow

/**
 * Wallets
 */
export function selectWallets(state: AppState): WalletsState {
  return state.wallets
}

export function selectWalletsPersist(state: AppState): WalletsPersist {
  return state.wallets.persist
}

export function selectWalletsItems(state: AppState): Wallets {
  return state.wallets.persist.items
}

export function selectActiveWalletId(state: AppState): ?WalletId {
  return state.wallets.persist.activeWalletId
}

export function selectWalletsCreate(state: AppState): WalletsCreateState {
  return state.walletsCreate
}

export function selectWalletsImport(state: AppState): WalletsImportState {
  return state.walletsImport
}

export function selectWalletsBackup(state: AppState): WalletsBackupState {
  return state.walletsBackup
}

export function selectWalletsAddresses(state: AppState): WalletsAddressesState {
  return state.walletsAddresses
}

export function selectWalletsAddressNames(state: AppState): AddressNames {
  return state.walletsAddresses.persist.addressNames
}

export function selectWalletsRenameAddress(state: AppState): WalletsRenameAddressState {
  return state.walletsRenameAddress
}

/**
 * Networks
 */
// export function selectNetworks(state: AppState): NetworksData {
//   return state.networks
// }

// export function selectNetworksItems(state: AppState): Networks {
//   return state.networks.items
// }

// eslint-disable-next-line no-unused-vars
export function selectNetworkId(state: AppState): NetworkId {
  return '3'
}

export function selectRPCProps(): RPCProps {
  return {
    rpcaddr: 'ropsten-node.jwallet.network',
    rpcport: 443,
    ssl: true,
  }
}

/**
 * Blocks
 */

// eslint-disable-next-line no-unused-vars
export function selectCurrentBlockNumber(state: AppState): number {
  return 0
}

/**
 * Digital Assets
 */
export function selectDigitalAssets(state: AppState): DigitalAssets {
  console.error('DEPRECATED')

  const {
    digitalAssets: {
      persist: {
        items,
      },
    },
  } = state

  return items
}

export function selectDigitalAsset(state: AppState, contractAddress: Address): ?DigitalAsset {
  console.error('DEPRECATED')

  const items = selectDigitalAssets(state)
  if (items[contractAddress]) {
    return items[contractAddress]
  }

  const addressLower = contractAddress.toLowerCase()
  const key = Object.keys(items).find(addr => items[addr].address.toLowerCase() === addressLower)
  return key ? items[key] : null
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

export function selectDigitalAssetsBalances(state: AppState): DigitalAssetsBalances {
  const {
    digitalAssets: {
      persist: {
        balances,
      },
    },
  } = state

  return balances
}

export function selectDigitalAssetsOwnerBalances(
  state: AppState,
  blockNumber: number,
  ownerAddress: Address,
): ?DigitalAssetsOwnerBalances {
  const balances = selectDigitalAssetsBalances(state)
  const networkId = selectNetworkId(state)
  const block = blockNumber.toString()

  if (balances &&
      balances[networkId] &&
      balances[networkId][block] &&
      balances[networkId][block][ownerAddress]
  ) {
    return balances[networkId][block][ownerAddress]
  } else {
    return null
  }
}

export function selectDigitalAssetBalance(
  state: AppState,
  blockNumber: number,
  ownerAddress: Address,
  assetAddress: Address
): ?DigitalAssetsBalance {
  const ownerBalances = selectDigitalAssetsOwnerBalances(state, blockNumber, ownerAddress)

  if (ownerBalances && ownerBalances[assetAddress]) {
    return ownerBalances[assetAddress]
  } else {
    return null
  }
}

export function selectAddAsset(state: AppState): AddAssetState {
  return state.addAsset
}

export function selectEditAsset(state: AppState): EditAssetState {
  return state.editAsset
}

// export function selectEditAsset(state: AppState): EditAssetState {
//   return state.editAsset
// }

// /**
//  * Funds
//  */
// export function selectReceiveFunds(state: AppState): ReceiveFundsData {
//   return state.receiveFunds
// }

// export function selectSendFunds(state: AppState): SendFundsData {
//   return state.sendFunds
// }
