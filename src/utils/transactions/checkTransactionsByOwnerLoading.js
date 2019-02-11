// @flow

import checkTransactionsByAssetLoading from './checkTransactionsByAssetLoading'
import getDigitalAssetByAddress from '../digitalAssets/getDigitalAssetByAddress'

function checkTransactionsByOwnerLoading(
  itemsByOwner: ?TransactionsByOwner,
  activeAssets: DigitalAsset[],
  walletCreatedBlockNumber: ?number,
): boolean {
  if (!itemsByOwner) {
    return true
  }

  const assetAddresses: AssetAddress[] = Object.keys(itemsByOwner)

  if (!assetAddresses.length) {
    return true
  }

  return assetAddresses.reduce((
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

    const digitalAsset: ?DigitalAsset = getDigitalAssetByAddress(activeAssets, assetAddress)

    if (!digitalAsset) {
      return true
    }

    const { deploymentBlockNumber }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams
    const minBlock: ?number = walletCreatedBlockNumber || deploymentBlockNumber

    // return result of iterating by addresses of assets
    return checkTransactionsByAssetLoading(itemsByAssetAddress, minBlock)
  }, false)
}

export default checkTransactionsByOwnerLoading
