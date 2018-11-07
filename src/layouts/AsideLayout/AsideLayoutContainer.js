// @flow

import { connect } from 'react-redux'

import {
  openLayout,
  closeLayout,
} from 'routes/modules/aside'

import AsideLayout from './AsideLayout'

const mapDispatchToProps = {
  openLayout,
  closeLayout,
}

/* eslint-disable no-undef */
export default (
  connect < AppState, any, Object, _, _ > (null, mapDispatchToProps)
)(AsideLayout)
/* eslint-enable no-undef */
