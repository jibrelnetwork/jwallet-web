// @flow

function compareDigitalAssetsByName(
  first: string,
  second: string,
  direction: SortDirection,
  isFirstCustom?: boolean = false,
  isSecondCustom?: boolean = false,
): number {
  // if one of the assets is not custom, we display custom first
  if (isFirstCustom && !isSecondCustom) {
    return -1
  }

  if (!isFirstCustom && isSecondCustom) {
    return 1
  }

  // if assets are both custom or are both not custom, compare by name
  if (first > second) {
    return (direction === 'asc') ? 1 : -1
  } else if (first < second) {
    return (direction === 'asc') ? -1 : 1
  } else {
    return 0
  }
}

export default compareDigitalAssetsByName
