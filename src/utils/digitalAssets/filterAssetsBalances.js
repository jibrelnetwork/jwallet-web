// @flow

import {
  flattenTransactionsByAsset,
  checkTransactionsByAssetLoading,
} from 'utils/transactions'

function filterAssetsBalances(
  assetBalances: ?Balances,
  txsByOwner: ?TransactionsByOwner,
  assets: DigitalAssets,
  processingBlock: ?BlockData,
  walletCreatedBlockNumber: ?number
): ?Balances {
  if (!(assetBalances && processingBlock)) {
    return null
  }

  const assetAddresses: AssetAddress[] = Object.keys(assetBalances)

  return assetAddresses.reduce((
    result: Balances,
    assetAddress: AssetAddress,
  ): Balances => {
    if (!(txsByOwner && assetBalances)) {
      return result
    }

    const txsByAsset: ?TransactionsByAssetAddress = txsByOwner[assetAddress]

    const fetchedTxs: TransactionWithPrimaryKeys[] =
      flattenTransactionsByAsset(txsByAsset, assetAddress)

    const isFetchedEmpty: boolean = !fetchedTxs.length
    const digitalAsset: ?DigitalAsset = assets[assetAddress]

    if (!digitalAsset) {
      return result
    }

    const { deploymentBlockNumber }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams
    const minBlock: ?number = walletCreatedBlockNumber || deploymentBlockNumber

    const isLoading: boolean = checkTransactionsByAssetLoading(txsByAsset, minBlock)

    if (isFetchedEmpty && isLoading) {
      return result
    }

    return {
      ...result,
      [assetAddress]: assetBalances[assetAddress],
    }
  }, {})
}

export default filterAssetsBalances
