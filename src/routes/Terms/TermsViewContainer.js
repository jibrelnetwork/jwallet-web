// @flow

import { connect } from 'react-redux'

import TermsView from './TermsView'
import { goToHome } from './modules/terms'

const mapDispatchToProps = {
  goToHome,
}

export default connect(null, mapDispatchToProps)(TermsView)

