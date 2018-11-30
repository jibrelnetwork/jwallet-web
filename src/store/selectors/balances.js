// @flow

export function selectBalances(state: AppState): BalancesState {
  return state.balances
}

export function selectBalancesPersist(state: AppState): BalancesPersist {
  const balances: BalancesState = selectBalances(state)

  return balances.persist
}

export function selectBalancesItems(state: AppState): BalancesItems {
  const balancesPersist: BalancesPersist = selectBalancesPersist(state)

  return balancesPersist.items
}

export function selectBalancesByNetworkId(
  state: AppState,
  networkId: NetworkId,
): ?BalancesByNetworkId {
  const balancesItems: BalancesItems = selectBalancesItems(state)

  return balancesItems[networkId]
}

export function selectBalancesByBlockNumber(
  state: AppState,
  networkId: NetworkId,
  blockNumber: number,
): ?BalancesByBlockNumber {
  const byNetworkId: ?BalancesByNetworkId = selectBalancesByNetworkId(state, networkId)

  if (!byNetworkId) {
    return null
  }

  return byNetworkId[blockNumber.toString()]
}

export function selectBalancesByOwnerAddress(
  state: AppState,
  networkId: NetworkId,
  blockNumber: number,
  ownerAddress: OwnerAddress,
): ?Balances {
  const byBlockNumber: ?BalancesByBlockNumber = selectBalancesByBlockNumber(
    state,
    networkId,
    blockNumber,
  )

  if (!byBlockNumber) {
    return null
  }

  return byBlockNumber[ownerAddress]
}

export function selectBalanceByAssetAddress(
  state: AppState,
  networkId: NetworkId,
  blockNumber: number,
  ownerAddress: OwnerAddress,
  assetAddress: AssetAddress,
): ?Balance {
  const byOwnerAddress: ?Balances = selectBalancesByOwnerAddress(
    state,
    networkId,
    blockNumber,
    ownerAddress,
  )

  if (!byOwnerAddress) {
    return null
  }

  return byOwnerAddress[assetAddress]
}

export function selectPendingBalances(
  state: AppState,
  networkId: NetworkId,
  blockNumber: number,
  ownerAddress: OwnerAddress,
): Balance[] {
  const byOwnerAddress: ?Balances = selectBalancesByOwnerAddress(
    state,
    networkId,
    blockNumber,
    ownerAddress,
  )

  if (!byOwnerAddress) {
    return []
  }

  return Object
    .keys(byOwnerAddress)
    .reduce((result: Balance[], assetAddress: AssetAddress) => {
      const balance: ?Balance = byOwnerAddress[assetAddress]

      if (!(balance && balance.isLoading)) {
        return result
      }

      return [
        ...result,
        balance,
      ]
    }, [])
}
