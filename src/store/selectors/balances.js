// @flow strict

import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'

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
  networkIdOptional?: NetworkId,
): ?BalancesByNetworkId {
  const networkId: NetworkId = networkIdOptional || selectCurrentNetworkId(state)
  const balancesItems: BalancesItems = selectBalancesItems(state)

  return balancesItems[networkId]
}

export function selectBalancesByOwner(
  state: AppState,
  ownerOptional?: OwnerAddress,
): ?BalancesByOwner {
  const owner: ?OwnerAddress = ownerOptional || selectActiveWalletAddress(state)

  if (!owner) {
    return null
  }

  const itemsByNetworkId: ?BalancesByNetworkId = selectBalancesByNetworkId(state)

  if (!itemsByNetworkId) {
    return null
  }

  return itemsByNetworkId[owner]
}

export function selectBalancesByBlockNumber(
  state: AppState,
  blockNumberOptional?: ?BlockNumber,
): ?Balances {
  const currentBlock: ?BlockData = selectCurrentBlock(state)

  const blockNumber: ?BlockNumber = blockNumberOptional ||
    (currentBlock && currentBlock.number.toString())

  if (!blockNumber) {
    return null
  }

  const itemsByOwner: ?BalancesByOwner = selectBalancesByOwner(state)

  if (!itemsByOwner) {
    return null
  }

  return itemsByOwner[blockNumber]
}

export function selectBalanceByAssetAddress(
  state: AppState,
  assetAddress: AssetAddress,
): ?Balance {
  const itemsByBlockNumber: ?Balances = selectBalancesByBlockNumber(state)

  if (!itemsByBlockNumber) {
    return null
  }

  return itemsByBlockNumber[assetAddress]
}
