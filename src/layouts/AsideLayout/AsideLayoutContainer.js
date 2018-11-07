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

type OwnProps = {|
  +children: React$Node,
|}

/* eslint-disable no-undef */
export default (
  connect < AppState, any, OwnProps, _, _ > (null, mapDispatchToProps)
)(AsideLayout)
/* eslint-enable no-undef */
