// @flow

import checkTransactionsByAssetLoading from './checkTransactionsByAssetLoading'

function checkTransactionsByOwnerLoading(itemsByOwner: ?TransactionsByOwner): boolean {
  if (!itemsByOwner) {
    return true
  }

  return Object.keys(itemsByOwner).reduce((
    resultByAssetAddress: boolean,
    assetAddress: AssetAddress,
  ): boolean => {
    // return true if already true
    if (resultByAssetAddress) {
      return true
    }

    const itemsByAssetAddress: ?TransactionsByAssetAddress = itemsByOwner
      ? itemsByOwner[assetAddress]
      : null

    // return true if items was not found by existed key
    if (!itemsByAssetAddress) {
      return true
    }

    // return result of iterating by addresses of assets
    return checkTransactionsByAssetLoading(itemsByAssetAddress)
  }, false)
}

export default checkTransactionsByOwnerLoading
