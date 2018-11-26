// @flow

import { selectNetworkId } from './networks'

export function selectDigitalAssetsBalances(state: AppState): Balances {
  const {
    balances: {
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
): ?OwnerBalances {
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
): ?Balance {
  const ownerBalances = selectDigitalAssetsOwnerBalances(state, blockNumber, ownerAddress)

  if (ownerBalances && ownerBalances[assetAddress]) {
    return ownerBalances[assetAddress]
  } else {
    return null
  }
}

