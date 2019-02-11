// @flow

import { connect } from 'react-redux'

import NotFoundView from './NotFoundView'
import { goToHome } from './modules/notFound'

const mapDispatchToProps = {
  goToHome,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(null, mapDispatchToProps)
)(NotFoundView)
