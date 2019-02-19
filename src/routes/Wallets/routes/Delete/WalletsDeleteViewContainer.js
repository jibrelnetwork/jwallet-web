// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import WalletsDeleteView from './WalletsDeleteView'

import {
  remove,
  openView,
  closeView,
} from '../../../../store/modules/walletsDelete'

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
  goToWallets: () => push('/wallets'),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsDeleteView)
