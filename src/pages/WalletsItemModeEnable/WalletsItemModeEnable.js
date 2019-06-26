// @flow strict

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

import {
  type Props,
  WalletsItemModeEnableView,
} from './WalletsItemModeEnableView'

type OwnProps = {|
  +walletId: string,
|}

const mapDispatchToProps = {
  goBackToWallets: () => actions.navigateTo('Wallets'),
}

export const WalletsItemModeEnable = connect<Props, OwnProps, _, _, _, _>(
  null,
  mapDispatchToProps,
)(WalletsItemModeEnableView)
