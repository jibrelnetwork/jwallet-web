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

export default connect(null, mapDispatchToProps)(AsideLayout)
