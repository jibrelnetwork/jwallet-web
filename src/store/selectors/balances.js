// @flow

import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectCurrentBlock } from 'store/selectors/blocks'

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

export function selectBalancesByOwner(
  state: AppState,
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
): ?BalancesByOwner {
  const itemsByNetworkId: ?BalancesByNetworkId = selectBalancesByNetworkId(
    state,
    networkId,
  )

  if (!itemsByNetworkId) {
    return null
  }

  return itemsByNetworkId[ownerAddress]
}

export function selectBalancesByBlockNumber(
  state: AppState,
  networkId: NetworkId,
  ownerAddress: ?OwnerAddress,
  blockNumber: ?BlockNumber,
): ?Balances {
  if (!(blockNumber && ownerAddress)) {
    return null
  }

  const itemsByOwner: ?BalancesByOwner = selectBalancesByOwner(state, networkId, ownerAddress)

  if (!itemsByOwner) {
    return null
  }

  return itemsByOwner[blockNumber]
}

export function selectBalanceByAssetAddress(
  state: AppState,
  networkId: NetworkId,
  ownerAddress: ?OwnerAddress,
  blockNumber: ?BlockNumber,
  assetAddress: AssetAddress,
): ?Balance {
  if (!(blockNumber && ownerAddress)) {
    return null
  }

  const itemsByBlockNumber: ?Balances = selectBalancesByBlockNumber(
    state,
    networkId,
    ownerAddress,
    blockNumber,
  )

  if (!itemsByBlockNumber) {
    return null
  }

  return itemsByBlockNumber[assetAddress]
}

export function selectBalanceByAssetAddressToCurrentBlock(
  state: AppState,
  assetAddress: AssetAddress,
): ?Balance {
  const networkID = selectCurrentNetworkId(state)
  const currentAddress = selectActiveWalletAddress(state)
  const currentBlock = selectCurrentBlock(state, networkID)
  const currentBlockNumber = currentBlock ? currentBlock.number : null

  return selectBalanceByAssetAddress(
    state,
    networkID,
    currentAddress,
    String(currentBlockNumber),
    assetAddress,
  )
}
