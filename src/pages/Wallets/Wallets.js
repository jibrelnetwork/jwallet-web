// @flow strict

import { connect } from 'react-redux'

import {
  selectWalletsItems,
  selectActiveWalletIdOrThrow,
} from 'store/selectors/wallets'

import { WalletsView } from './WalletsView'

function mapStateToProps(state: AppState) {
  return {
    items: selectWalletsItems(state),
    activeWalletId: selectActiveWalletIdOrThrow(state),
  }
}

export const Wallets = (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps)
)(WalletsView)
