// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  selectActiveWallet,
  selectAddressNames,
  selectWalletsItems,
  selectActiveWalletId,
  selectWalletsAddresses,
  selectAddressWalletsNames,
} from 'store/selectors/wallets'

import WalletsAddressesView from './WalletsAddressesView'

import {
  openView,
  closeView,
  setActive,
  getMoreRequest,
} from './modules/walletsAddresses'

function mapStateToProps(state: AppState) {
  const {
    addresses,
    // balances,
    iteration,
    // isLoading,
  }: WalletsAddressesState = selectWalletsAddresses(state)

  const wallets: Wallets = selectWalletsItems(state)
  const foundWallet: ?Wallet = selectActiveWallet(state)
  const walletId: ?WalletId = selectActiveWalletId(state)
  const addressNames: AddressNames = selectAddressNames(state)
  const walletsAddressNames: AddressNames = selectAddressWalletsNames(state)

  return {
    wallets,
    // balances,
    addresses,
    walletId,
    addressNames,
    walletsAddressNames,
    iteration,
    // isLoading,
    isReadOnly: foundWallet ? foundWallet.isReadOnly : false,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  setActive,
  getMoreRequest,
  goToWallets: () => push('/wallets'),
  renameAddress: (address: Address) => push(`/wallets/rename/address/${address}`),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsAddressesView)
