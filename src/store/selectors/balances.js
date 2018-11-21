// @flow

import { selectNetworkId } from './networks'

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

