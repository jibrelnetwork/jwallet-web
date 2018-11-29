// @flow

import { connect } from 'react-redux'

import {
  selectWalletsPersist,
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
  const {
    items,
    activeWalletId,
  }: WalletsPersist = selectWalletsPersist(state)

  const {
    addresses,
    persist,
    iteration,
  }: WalletsAddressesState = selectWalletsAddresses(state)

  return {
    items,
    addresses,
    iteration,
    activeWalletId,
    addressNames: persist.addressNames,
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

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(MenuLayout)
