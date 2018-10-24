// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import WalletsAddressesView from './WalletsAddressesView'

import {
  openView,
  closeView,
  getMoreRequest,
  setActiveRequest,
} from './modules/walletsAddresses'

type StateProps = {|
  +wallets: Wallets,
  +addresses: Addresses,
  +balances: Balances,
  +iteration: Index,
  +walletId: ?WalletId,
  +isLoading: boolean,
  +isReadOnly: boolean,
|}

function mapStateToProps({ walletsAddresses, wallets }: State): StateProps {
  const { items, activeWalletId } = wallets
  const foundWallet: ?Wallet = items.find((w: Wallet): boolean => (activeWalletId === w.id))

  return {
    ...walletsAddresses,
    wallets: items,
    walletId: activeWalletId,
    isReadOnly: foundWallet ? foundWallet.isReadOnly : false,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  getMoreRequest,
  setActiveRequest,
  goToWallets: () => push('/wallets'),
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletsAddressesView)
