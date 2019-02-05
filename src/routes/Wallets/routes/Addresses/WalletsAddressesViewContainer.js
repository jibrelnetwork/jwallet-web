// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import getWallet from 'utils/wallets/getWallet'

import {
  selectAddressNames,
  selectWalletsItems,
  selectActiveWalletId,
  selectWalletsAddresses,
  selectAddressWalletsNames,
} from 'store/selectors/wallets'

import WalletsAddressesView from './WalletsAddressesView'

import {
  setActive,
  onOpenView,
  onCloseView,
  getMoreRequest,
} from './modules/walletsAddresses'

function mapStateToProps(state: AppState) {
  const {
    balances,
    addresses,
    isLoading,
  }: WalletsAddressesState = selectWalletsAddresses(state)

  const wallets: Wallets = selectWalletsItems(state)
  const walletId: ?WalletId = selectActiveWalletId(state)
  const addressNames: AddressNames = selectAddressNames(state)
  const walletsAddressNames: AddressNames = selectAddressWalletsNames(state)
  // FIXME: a hack to avoid breaking UI apart before redirect happens
  /* eslint-disable fp/no-mutation */
  // eslint-disable-next-line fp/no-let
  let isReadOnly = false
  try {
    const wallet: Wallet = getWallet(wallets, walletId);
    ({ isReadOnly } = wallet)
  } catch (e) {
    isReadOnly = true
  }
  /* eslint-enable fp/no-mutation */

  return {
    balances,
    addresses,
    addressNames,
    walletsAddressNames,
    isLoading,
    isReadOnly,
  }
}

const mapDispatchToProps = {
  setActive,
  onOpenView,
  onCloseView,
  getMoreRequest,
  goToWallets: () => push('/wallets'),
  renameAddress: (address: Address) => push(`/wallets/rename/address/${address}`),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsAddressesView)
