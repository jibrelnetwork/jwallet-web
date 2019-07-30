// @flow

import { connect } from 'react-redux'

import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectBalancesByBlockNumber } from 'store/selectors/balances'
import { selectTransactionsByOwner } from 'store/selectors/transactions'

import {
  selectActiveWalletOrThrow,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'

import {
  selectDigitalAssetsItems,
} from 'store/selectors/digitalAssets'

import {
  filterAssetsBalances,
  flattenDigitalAssets,
  getDigitalAssetsWithBalance,
} from 'utils/digitalAssets'

import {
  selectCurrentBlock,
  selectProcessingBlock,
} from 'store/selectors/blocks'

import {
  setAssetIsActive,
} from 'store/modules/digitalAssets'

import {
  HomeView,
  type Props,
} from './HomeView'

function mapStateToProps(state: AppState) {
  const wallet: Wallet = selectActiveWalletOrThrow(state)

  const networkId: NetworkId = selectCurrentNetworkId(state)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state)
  const processingBlock: ?BlockData = selectProcessingBlock(state)
  const assets: DigitalAssets = selectDigitalAssetsItems(state)
  const txs: ?TransactionsByOwner = selectTransactionsByOwner(state)

  const assetsBalances: ?Balances = selectBalancesByBlockNumber(
    state,
    networkId,
    ownerAddress,
    currentBlock ? currentBlock.number.toString() : null,
  )

  /**
   * filterAssetsBalances is necessary to make sure that app displays
   * consistent state of balance+transactions by specific digital asset
   */
  const assetsBalancesFiltered: ?Balances = filterAssetsBalances(
    assetsBalances,
    txs,
    assets,
    processingBlock,
    wallet.createdBlockNumber && wallet.createdBlockNumber.mainnet,
  )

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    flattenDigitalAssets(assets),
    assetsBalancesFiltered,
  )

  return {
    items: assetsWithBalance,
  }
}

const mapDispatchToProps = {
  setAssetIsActive,
}

export default (
  connect< Props, OwnPropsEmpty, _, _, _, _ >(mapStateToProps, mapDispatchToProps)
)(HomeView)
