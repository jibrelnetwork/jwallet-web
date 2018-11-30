// @flow

function compareDigitalAssetsByName(
  first: string,
  second: string,
  direction: SortDirection,
  isFirstCustom?: boolean = false,
): number {
  if (isFirstCustom) {
    return -1
  }

  if (first > second) {
    return (direction === 'asc') ? 1 : -1
  } else if (first < second) {
    return (direction === 'asc') ? -1 : 1
  } else {
    return 0
  }
}

export default compareDigitalAssetsByName
