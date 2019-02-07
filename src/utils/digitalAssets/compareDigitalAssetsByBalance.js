// @flow

import { divDecimals, toBigNumber } from 'utils/numbers'

const toNominalValue = (asset: DigitalAssetWithBalance) => {
  const { balance } = asset
  const { decimals } = asset.blockchainParams
  if (!balance || !decimals) {
    return toBigNumber()
  }

  return divDecimals(
    toBigNumber(balance.value),
    decimals
  )
}

function compareDigitalAssetsByBalance(
  first: DigitalAssetWithBalance,
  second: DigitalAssetWithBalance,
  direction: SortDirection,
): number {
  const firstNum = toNominalValue(first)
  const secondNum = toNominalValue(second)

  if (firstNum.gt(secondNum)) {
    return (direction === 'asc') ? 1 : -1
  } else if (firstNum.lt(secondNum)) {
    return (direction === 'asc') ? -1 : 1
  } else {
    return 0
  }
}

export default compareDigitalAssetsByBalance
