// @flow

import { connect } from 'react-redux'

import AgreementsView from './AgreementsView'

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(AgreementsView)
