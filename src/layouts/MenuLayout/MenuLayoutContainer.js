// @flow

import { connect } from 'react-redux'

import { selectWalletsPersist, selectWalletsAddresses } from 'store/stateSelectors'

import MenuLayout from './MenuLayout'

type StateProps = {|
  +items: Wallets,
  +addresses: Addresses,
  +addressNames: AddressNames,
  +activeWalletId: ?WalletId,
|}

function mapStateToProps(state: AppState): StateProps {
  const {
    items,
    activeWalletId,
  }: WalletsPersist = selectWalletsPersist(state)

  const {
    addresses,
    persist,
  }: WalletsAddressesState = selectWalletsAddresses(state)

  return {
    items,
    addresses,
    activeWalletId,
    addressNames: persist.addressNames,
  }
}

export default connect(mapStateToProps)(MenuLayout)
