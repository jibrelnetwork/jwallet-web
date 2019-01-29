// @flow

import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AgreementsView from './AgreementsView'

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onSubmit: () => push('/wallets/start'),
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(AgreementsView)
