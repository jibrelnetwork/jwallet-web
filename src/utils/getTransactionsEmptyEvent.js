// @flow

const getTransactionsEmptyEvent = (
  items: Transactions,
  currentAsset: DigitalAsset,
  isBlockExplorerError: boolean,
  isCustomNetwork: boolean,
): ?string => {
  if (isCustomNetwork) {
    return 'private-node'
  }

  if (isBlockExplorerError) {
    return 'be-error'
  }

  if (!currentAsset) {
    return 'no-active'
  }

  if (!(items && items.length)) {
    return 'empty-list'
  }

  return null
}

export default getTransactionsEmptyEvent
