// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { selectAllAddressNames } from 'store/selectors/favorites'

import {
  selectWalletsItems,
  selectActiveWalletId,
  selectWalletsAddresses,
} from 'store/selectors/wallets'

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
    isConnectionError: false,
  }
}

const mapDispatchToProps = {
  setActive,
  getMoreRequest,
  openLayout: openMenuLayout,
  closeLayout: closeMenuLayout,
  onSendAssetClick: () => push('/digital-assets/send'),
}

/* ::
type OwnProps = {|
  +children: React$Node,
|}
*/

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(MenuLayout)
