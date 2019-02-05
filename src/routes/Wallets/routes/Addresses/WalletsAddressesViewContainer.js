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

function checkWalletReadOnly(wallets: Wallets, walletId: ?WalletId): boolean {
  // FIXME: a hack to avoid breaking UI apart before redirect happens
  try {
    const { isReadOnly }: Wallet = getWallet(wallets, walletId)

    return isReadOnly
  } catch (e) {
    return false
  }
}

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

  return {
    balances,
    addresses,
    addressNames,
    walletsAddressNames,
    isLoading,
    isReadOnly: checkWalletReadOnly(wallets, walletId),
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
