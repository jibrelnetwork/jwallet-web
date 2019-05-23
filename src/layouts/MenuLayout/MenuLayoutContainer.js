// @flow

import { connect } from 'react-redux'

import {
  openMenuLayout,
  closeMenuLayout,
} from 'store/modules/core'

import {
  MenuLayout,
  type Props,
} from './MenuLayout'

type OwnProps = {|
  +children: React$Node,
  +routeName: string,
|}

const mapDispatchToProps = {
  openLayout: openMenuLayout,
  closeLayout: closeMenuLayout,
}

const mapStateToProps = () => ({ isConnectionError: false })

export const MenuLayoutContainer = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(MenuLayout)
