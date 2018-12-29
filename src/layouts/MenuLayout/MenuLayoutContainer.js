// @flow

import { connect } from 'react-redux'

import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectAllAddressNames } from 'store/selectors/favorites'
import { selectBalanceByAssetAddress } from 'store/selectors/balances'
import ethereumAddress from 'data/assets/ethereum'

import {
  selectWalletsItems,
  selectActiveWalletId,
  selectWalletsAddresses,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'

import {
  selectCurrentBlock,
} from 'store/selectors/blocks'

import {
  openMenuLayout,
  closeMenuLayout,
} from 'routes/modules/core'

import {
  setActive,
  getMoreRequest,
} from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'

import MenuLayout from './MenuLayout'

function mapStateToProps(state: AppState) {
  const items: Wallets = selectWalletsItems(state)
  const activeWalletId: ?WalletId = selectActiveWalletId(state)
  const addressNames: AddressNames = selectAllAddressNames(state)
  const networkId: NetworkId = selectCurrentNetworkId(state)
  const ownerAddress: ?OwnerAddress = selectActiveWalletAddress(state)
  const currentBlock: ?BlockData = selectCurrentBlock(state, networkId)

  const ethBalance: ?Balance = selectBalanceByAssetAddress(
    state,
    networkId,
    ownerAddress,
    currentBlock ? currentBlock.number.toString() : null,
    ethereumAddress.address,
  )

  const {
    addresses,
    iteration,
  }: WalletsAddressesState = selectWalletsAddresses(state)

  return {
    items,
    addresses,
    addressNames,
    iteration,
    activeWalletId,
    ethBalance,
    isConnectionError: false,
  }
}

const mapDispatchToProps = {
  setActive,
  getMoreRequest,
  openLayout: openMenuLayout,
  closeLayout: closeMenuLayout,
}

/* ::
type OwnProps = {|
  +children: React$Node,
|}
*/

export default connect/* :: < AppState, any, OwnProps, _, _ > */(
  mapStateToProps,
  mapDispatchToProps
)(MenuLayout)
