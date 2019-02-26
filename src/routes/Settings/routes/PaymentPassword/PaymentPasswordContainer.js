// @flow
import { connect } from 'react-redux'

import { changePaymentPassword } from 'store/modules/settings'

import PaymentPasswordView from './PaymentPasswordView'

const mapStateToProps = ({ settings: passwordForm }) => passwordForm

const dispatchToProps = {
  submit: changePaymentPassword,
}

export default connect/* :: < AppState, null, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
  dispatchToProps,
)(PaymentPasswordView)
