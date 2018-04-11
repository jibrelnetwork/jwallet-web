// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import NotFound from '../components/NotFound'

const mapDispatchToProps: {
  goToIndex: Function,
} = {
  goToIndex: () => push('/'),
}

export default connect(null, mapDispatchToProps)(NotFound)

