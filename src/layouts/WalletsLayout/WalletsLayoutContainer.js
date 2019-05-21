// @flow

import { connect } from 'react-redux'

import {
  openLayout,
  closeLayout,
} from 'store/modules/wallets'

import {
  WalletsLayout,
  type Props,
} from './WalletsLayout'

type OwnProps = {||}

const mapDispatchToProps = {
  openLayout,
  closeLayout,
}

export const WalletsLayoutContainer = (
  connect<Props, OwnProps, _, _, _, _ >(null, mapDispatchToProps)
)(WalletsLayout)
