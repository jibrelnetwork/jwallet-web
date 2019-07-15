// @flow strict

import { connect } from 'react-redux'

import { selectAddressNames } from 'store/selectors/wallets'

import {
  type Props,
  WalletsItemModeDisableView,
} from './WalletsItemModeDisableView'

type OwnProps = {|
  +walletId: string,
|}

function mapStateToProps(state: AppState) {
  return {
    addressNames: selectAddressNames(state),
  }
}

export const WalletsItemModeDisable = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(WalletsItemModeDisableView)
