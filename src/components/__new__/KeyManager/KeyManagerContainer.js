/* @flow */

import { compose } from 'ramda'
import { withState, withHandlers } from 'recompose'

import KeyManager from './KeyManager'

export default compose(
  withState('mode', 'setMode', 'info'),
  withState('password', 'setPassword', ''),
  withHandlers({
    onPasswordChange: ({ onPasswordChange, setPassword }) =>
      (event) => {
        const { value } = event.target
        onPasswordChange(value)
        setPassword(value)
      },
    onPasswordArrowClick: ({ onPasswordArrowClick, password }) =>
      () => onPasswordArrowClick(password),
  })
)(KeyManager)
