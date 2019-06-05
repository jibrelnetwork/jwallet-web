// @flow strict

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

import {
  type Props,
  WalletsItemDeleteView,
} from './WalletsItemDeleteView'

type OwnProps = {|
  +walletId: string,
|}

const mapDispatchToProps = {
  goBackToWallets: () => actions.navigateTo('Wallets'),
}

export const WalletsItemDelete = connect<Props, OwnProps, _, _, _, _>(
  null,
  mapDispatchToProps,
)(WalletsItemDeleteView)
