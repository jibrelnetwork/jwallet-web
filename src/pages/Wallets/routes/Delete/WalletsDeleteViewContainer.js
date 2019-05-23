// @flow

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

import {
  remove,
  openView,
  closeView,
} from 'store/modules/walletsDelete'

// eslint-disable-next-line import/no-duplicates
import WalletsDeleteView from './WalletsDeleteView'

// eslint-disable-next-line import/no-duplicates
import { type Props } from './WalletsDeleteView'

type StateProps = {|
  +items: Wallets,
|}

function mapStateToProps({ wallets }: AppState): StateProps {
  return {
    items: wallets.persist.items,
  }
}

const mapDispatchToProps = {
  remove,
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
)(WalletsDeleteView)
