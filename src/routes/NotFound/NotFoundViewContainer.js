// @flow

import { connect } from 'react-redux'

import NotFoundView from './NotFoundView'
import { goToHome } from './modules/notFound'

const mapDispatchToProps = {
  goToHome,
}

export default connect(null, mapDispatchToProps)(NotFoundView)

