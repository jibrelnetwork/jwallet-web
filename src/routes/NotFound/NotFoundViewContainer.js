// @flow

import { connect } from 'react-redux'

import { goToHome } from 'store/modules/notFound'

import NotFoundView from './NotFoundView'

const mapDispatchToProps = {
  goToHome,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(null, mapDispatchToProps)
)(NotFoundView)
