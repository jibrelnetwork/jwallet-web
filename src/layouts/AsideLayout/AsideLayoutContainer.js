// @flow

import { connect } from 'react-redux'

import {
  openAsideLayout,
  closeAsideLayout,
} from 'routes/modules/layout'

import AsideLayout from './AsideLayout'

const mapDispatchToProps = {
  openLayout: openAsideLayout,
  closeLayout: closeAsideLayout,
}

export default (
  connect/* :: < AppState, any, Object, _, _ > */(null, mapDispatchToProps)
)(AsideLayout)
