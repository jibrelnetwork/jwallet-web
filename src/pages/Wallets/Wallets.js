// @flow strict

import { connect } from 'react-redux'

import {
  selectWalletsItems,
  selectActiveWalletIdOrThrow,
} from 'store/selectors/wallets'

import {
  type Props,
  WalletsView,
} from './WalletsView'

function mapStateToProps(state: AppState) {
  return {
    items: selectWalletsItems(state),
    activeWalletId: selectActiveWalletIdOrThrow(state),
  }
}

export const Wallets = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
)(WalletsView)
