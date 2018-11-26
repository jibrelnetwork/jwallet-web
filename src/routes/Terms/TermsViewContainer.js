// @flow

import { connect } from 'react-redux'

import TermsView from './TermsView'
import { goToHome } from './modules/terms'

const mapDispatchToProps = {
  goToHome,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(null, mapDispatchToProps)
)(TermsView)
