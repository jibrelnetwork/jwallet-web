// @flow

/**
 * Wallets
 */
export function selectWallets(state: State): WalletsState {
  return state.wallets
}

export function selectWalletsPersist(state: State): WalletsPersist {
  return state.wallets.persist
}

export function selectWalletsItems(state: State): Wallets {
  return state.wallets.persist.items
}

export function selectActiveWalletId(state: State): ?WalletId {
  return state.wallets.persist.activeWalletId
}

export function selectWalletsCreate(state: State): WalletsCreateState {
  return state.walletsCreate
}

export function selectWalletsImport(state: State): WalletsImportState {
  return state.walletsImport
}

export function selectWalletsBackup(state: State): WalletsBackupState {
  return state.walletsBackup
}

export function selectWalletsAddresses(state: State): WalletsAddressesState {
  return state.walletsAddresses
}

export function selectWalletsAddressNames(state: State): AddressNames {
  return state.walletsAddresses.persist.addressNames
}

export function selectWalletsRenameAddress(state: State): WalletsRenameAddressState {
  return state.walletsRenameAddress
}

/**
 * Networks
 */
export function selectNetworks(state: State): NetworksData {
  return state.networks
}

export function selectNetworksItems(state: State): Networks {
  return state.networks.items
}

// eslint-disable-next-line no-unused-vars
export function selectNetworkId(state: State): ?NetworkId {
  return '3'
}

/**
 * Blocks
 */

// eslint-disable-next-line no-unused-vars
export function selectCurrentBlockNumber(state: State): number {
  return 0
}

/**
 * Digital Assets
 */
export function selectDigitalAssets({ digitalAssets }: State): DigitalAssetsState {
  return digitalAssets
}

export function selectDigitalAssetsItems(state: State): DigitalAssets {
  const {
    digitalAssets: {
      persist: {
        items,
      },
    },
  } = state

  return items
}

export function selectDigitalAssetsBalances(state: State): DigitalAssetsBalances {
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
  state: State,
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
  state: State,
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

export function selectCustomAsset(state: State): CustomAssetState {
  return state.customAsset
}

/**
 * Transactions
 */
export function selectTransactions(state: State): TransactionsData {
  return state.transactions
}

export function selectTransactionsItems(state: State): Transactions {
  return state.transactions.items
}

/**
 * Funds
 */
export function selectReceiveFunds(state: State): ReceiveFundsData {
  return state.receiveFunds
}

export function selectSendFunds(state: State): SendFundsData {
  return state.sendFunds
}
