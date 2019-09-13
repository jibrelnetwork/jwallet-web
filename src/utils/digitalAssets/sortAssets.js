// @flow strict

import { checkETH } from '.'

type CompareResult = -1 | 0 | 1

function compareAssets(
  current: DigitalAssetWithBalance,
  next: DigitalAssetWithBalance,
): CompareResult {
  const {
    display: {
      digitalAssetsListPriority = -1,
    } = {},
    blockchainParams: {
      address,
    },
    name,
    isCustom,
    isActive,
  }: DigitalAssetWithBalance = current

  const nextPriority: number = next.display ? next.display.digitalAssetsListPriority : -1

  if (checkETH(address)) {
    return -1
  }

  if (isCustom && !next.isCustom) {
    return -1
  }

  if (isActive && !next.isActive) {
    return -1
  } else if (!isActive && next.isActive) {
    return 1
  }

  if (digitalAssetsListPriority > nextPriority) {
    return -1
  } else if (digitalAssetsListPriority < nextPriority) {
    return 1
  }

  if (name.toLowerCase() > next.name.toLowerCase()) {
    return 1
  } else if (name.toLowerCase() < next.name.toLowerCase()) {
    return -1
  }

  return 0
}

export function sortAssets(items: DigitalAssetWithBalance[]): DigitalAssetWithBalance[] {
  // eslint-disable-next-line fp/no-mutating-methods
  return [...items].sort(compareAssets)
}
