// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import WalletsDeleteView from './WalletsDeleteView'

import {
  openView,
  closeView,
  deleteRequest,
} from './modules/walletsDelete'

type StateProps = {|
  +items: Wallets,
|}

function mapStateToProps({ wallets }: State): StateProps {
  return {
    items: wallets.items,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  deleteRequest,
  goToWallets: () => push('/wallets'),
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletsDeleteView)
