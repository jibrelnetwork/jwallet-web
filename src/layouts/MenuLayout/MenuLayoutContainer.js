// @flow strict

import { connect } from 'react-redux'

import {
  openMenuLayout,
  closeMenuLayout,
} from 'store/modules/core'

import { MenuLayout } from './MenuLayout'

function mapStateToProps() {
  return {
    isConnectionError: false,
  }
}

const mapDispatchToProps = {
  openLayout: openMenuLayout,
  closeLayout: closeMenuLayout,
}

/* ::
type OwnProps = {|
  +children: React$Node,
  +routeName: string,
|}
*/

export const MenuLayoutContainer = connect/* :: < AppState, any, OwnProps, _, _ > */(
  mapStateToProps,
  mapDispatchToProps,
)(MenuLayout)
