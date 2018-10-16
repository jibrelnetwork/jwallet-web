// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import NotFoundView from './NotFoundView'

const mapDispatchToProps = {
  goToIndex: () => push('/'),
}

export default connect(null, mapDispatchToProps)(NotFoundView)

