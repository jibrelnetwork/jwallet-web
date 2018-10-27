// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { getWallet, getAddressWalletNames } from 'utils/wallets'

import WalletsAddressesView from './WalletsAddressesView'

import {
  openView,
  closeView,
  setActive,
  getMoreRequest,
} from './modules/walletsAddresses'

type StateProps = {|
  +wallets: Wallets,
  +addresses: Addresses,
  +addressNames: AddressNames,
  +addressWalletNames: AddressNames,
  +balances: Balances,
  +iteration: Index,
  +walletId: ?WalletId,
  +isLoading: boolean,
  +isReadOnly: boolean,
|}

function mapStateToProps({ walletsAddresses, wallets }: State): StateProps {
  const {
    persist: {
      addressNames,
    },
    addresses,
    balances,
    iteration,
    isLoading,
  } = walletsAddresses

  const { items, activeWalletId } = wallets.persist
  const foundWallet: ?Wallet = getWallet(items, activeWalletId)
  const addressWalletNames: AddressNames = getAddressWalletNames(items)

  return {
    addresses,
    balances,
    addressNames,
    addressWalletNames,
    iteration,
    isLoading,
    wallets: items,
    walletId: activeWalletId,
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletsAddressesView)
