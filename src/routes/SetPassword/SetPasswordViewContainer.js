// @flow strict

import { connect } from 'react-redux'

import { SetPasswordView } from './SetPasswordView'

function mapStateToProps() {
  return {
    errors: {},
    validate: (values: Object) => console.error(values),
    handleSubmit: (values: Object) => console.log(values),
  }
}

export const SetPasswordViewContainer = connect/* :: < AppState, null, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
)(SetPasswordView)
