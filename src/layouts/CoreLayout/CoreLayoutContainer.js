// @flow

import { connect } from 'react-redux'

import {
  openCoreLayout,
  closeCoreLayout,
} from 'routes/modules/core'

import CoreLayout from './CoreLayout'

const mapDispatchToProps = {
  openLayout: openCoreLayout,
  closeLayout: closeCoreLayout,
}

export default (
  connect/* :: < AppState, any, Object, _, _ > */(null, mapDispatchToProps)
)(CoreLayout)
