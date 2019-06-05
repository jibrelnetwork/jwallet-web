// @flow

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

import {
  rename,
  openView,
  closeView,
} from 'store/modules/walletsRename'

// eslint-disable-next-line import/no-duplicates
import WalletsRenameView from './WalletsRenameView'

// eslint-disable-next-line import/no-duplicates
import { type Props } from './WalletsRenameView'

function mapStateToProps({ wallets }: AppState) {
  const {
    persist: {
      items,
    },
  } = wallets

  return {
    items,
  }
}

const mapDispatchToProps = {
  rename,
  openView,
  closeView,
  goToWallets: () => actions.navigateTo('Wallets'),
}

type OwnProps = {|
  +params: {|
    +walletId: string,
  |},
|}

export default (
  connect< Props, OwnProps, _, _, _, _ >(mapStateToProps, mapDispatchToProps)
)(WalletsRenameView)
