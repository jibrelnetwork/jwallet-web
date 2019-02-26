// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
  openView,
  closeView,
  simplifyWallet,
  setActiveWallet,
} from 'store/modules/wallets'

import WalletsIndexView from './WalletsIndexView'

type StateProps = {|
  +items: Wallets,
|}

function mapStateToProps({ wallets }: AppState): StateProps {
  return {
    items: wallets.persist.items,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  simplifyWallet,
  setActiveWallet,
  createWallet: () => push('/wallets/create'),
  importWallet: () => push('/wallets/import'),
  renameWallet: (walletId: WalletId) => push(`/wallets/rename/${walletId}`),
  backupWallet: (walletId: WalletId) => push(`/wallets/backup/${walletId}`),
  deleteWallet: (walletId: WalletId) => push(`/wallets/delete/${walletId}`),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsIndexView)
