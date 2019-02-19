// @flow

import { connect } from 'react-redux'

import {
  openCoreLayout,
  closeCoreLayout,
} from 'store/modules/core'

import CoreLayout from './CoreLayout'

const mapDispatchToProps = {
  openLayout: openCoreLayout,
  closeLayout: closeCoreLayout,
}

// eslint-disable-next-line no-unused-vars
type OwnProps = {|
  children: React$Node,
|}

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(null, mapDispatchToProps)
)(CoreLayout)
