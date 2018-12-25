// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { selectCurrentBlock } from 'store/selectors/blocks'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectBalancesByOwnerAddress } from 'store/selectors/balances'

import {
  checkAssetFound,
  flattenDigitalAssets,
  compareDigitalAssetsByName,
  getDigitalAssetsWithBalance,
} from 'utils/digitalAssets'

import {
  selectDigitalAssetsItems,
  selectDigitalAssetsManageSearchQuery,
} from 'store/selectors/digitalAssets'

import DigitalAssetsManageView from './DigitalAssetsManageView'

import {
  openView,
  closeView,
  setSearchQuery,
} from './modules/digitalAssetsManage'

import {
  setAssetIsActive,
  deleteCustomAsset,
} from '../../modules/digitalAssets'

const mapStateToProps = (state: AppState) => {
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)
  const currentBlockNumber: number = currentBlock ? currentBlock.number : 0
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const assets: DigitalAssets = selectDigitalAssetsItems(state /* , networkId */)
  const searchQuery = selectDigitalAssetsManageSearchQuery(state)

  const assetsBalances: ?Balances = !ownerAddress ? null : selectBalancesByOwnerAddress(
    state,
    networkId,
    currentBlockNumber,
    ownerAddress,
  )

  const assetsWithBalance: DigitalAssetWithBalance[] = getDigitalAssetsWithBalance(
    flattenDigitalAssets(assets),
    assetsBalances,
  )

  const items: DigitalAssetWithBalance[] = assetsWithBalance
    .filter((item: DigitalAssetWithBalance): boolean => {
      const {
        name,
        symbol,
        address,
      }: DigitalAssetWithBalance = item

      const isAssetFound: boolean = checkAssetFound(name, symbol, address, searchQuery)

      return isAssetFound
    })

  // eslint-disable-next-line fp/no-mutating-methods
  items.sort((
    first: DigitalAssetWithBalance,
    second: DigitalAssetWithBalance,
  ): number => compareDigitalAssetsByName(first.name, second.name, 'asc', first.isCustom))

  return {
    items,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setSearchQuery,
  setAssetIsActive,
  deleteCustomAsset,
  editAsset: (address: Address) => push(`/digital-assets/edit-asset/${address}`),
  addAssetClick: () => push('/digital-assets/add-asset'),
}

// eslint-disable-next-line no-unused-vars
type OwnProps = {||}

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(DigitalAssetsManageView)
