// @flow

import { connect } from 'react-redux'

import {
  openCoreLayout,
  closeCoreLayout,
} from 'routes/modules/layout'

import AsideLayout from './CoreLayout'

const mapDispatchToProps = {
  openLayout: openCoreLayout,
  closeLayout: closeCoreLayout,
}

export default (
  connect/* :: < AppState, any, Object, _, _ > */(null, mapDispatchToProps)
)(AsideLayout)
