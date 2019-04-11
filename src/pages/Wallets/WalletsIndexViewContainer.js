// @flow

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

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
  createWallet: () => actions.navigateTo('WalletsCreate'),
  importWallet: () => actions.navigateTo('WalletsImport'),
  renameWallet: (walletId: WalletId) => actions.navigateTo('WalletsRename', { walletId }),
  backupWallet: (walletId: WalletId) => actions.navigateTo('WalletsBackup', { walletId }),
  deleteWallet: (walletId: WalletId) => actions.navigateTo('WalletsDelete', { walletId }),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsIndexView)
