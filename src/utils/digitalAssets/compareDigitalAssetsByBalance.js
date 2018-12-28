// @flow

import toBigNumber from 'utils/numbers/toBigNumber'

function compareDigitalAssetsByBalance(
  first: ?Balance,
  second: ?Balance,
  direction: SortDirection,
): number {
  if (!(first && second)) {
    return 0
  }

  const firstNum = toBigNumber(first.value)
  const secondNum = toBigNumber(second.value)

  if (firstNum.gt(secondNum)) {
    return (direction === 'asc') ? 1 : -1
  } else if (firstNum.lt(secondNum)) {
    return (direction === 'asc') ? -1 : 1
  } else {
    return 0
  }
}

export default compareDigitalAssetsByBalance
