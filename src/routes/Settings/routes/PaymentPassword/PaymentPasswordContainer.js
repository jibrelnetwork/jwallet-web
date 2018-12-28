// @flow
import { connect } from 'react-redux'

import { changePaymentPassword } from '../../modules/settings'

import PaymentPasswordView from './PaymentPasswordView'

// function mapStateToProps(state: AppState) {
//   return state
// }

const mapDispatchToProps = {
  submit: changePaymentPassword,
}

export default connect/* :: < AppState, null, OwnPropsEmpty, _, _ > */(
  null,
  mapDispatchToProps
)(PaymentPasswordView)
