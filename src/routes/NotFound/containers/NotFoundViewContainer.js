// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import NotFoundView from '../components/NotFoundView'

const mapDispatchToProps: {
  goToIndex: Function,
} = {
  goToIndex: () => push('/'),
}

export default connect(null, mapDispatchToProps)(NotFoundView)

