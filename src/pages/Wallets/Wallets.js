// @flow strict

import { connect } from 'react-redux'

import {
  selectWalletsItems,
  selectActiveWalletIdOrThrow,
} from 'store/selectors/wallets'

import {
  WalletsView, type Props,
} from './WalletsView'

function mapStateToProps(state: AppState) {
  return {
    items: selectWalletsItems(state),
    activeWalletId: selectActiveWalletIdOrThrow(state),
  }
}

export const Wallets = (
  connect< Props, OwnPropsEmpty, _, _, _, _ >(mapStateToProps)
)(WalletsView)
