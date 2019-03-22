// @flow

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

import {
  remove,
  openView,
  closeView,
} from 'store/modules/walletsDelete'

import WalletsDeleteView from './WalletsDeleteView'

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

/* ::
type OwnProps = {|
  +params: {|
    +walletId: string,
  |},
|}
*/

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsDeleteView)
