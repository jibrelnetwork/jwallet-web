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

const mapDispatchToProps = {
  openLayout,
  closeLayout,
}

export const WalletsLayoutContainer = (
  connect<Props, OwnPropsEmpty, _, _, _, _ >(null, mapDispatchToProps)
)(WalletsLayout)
