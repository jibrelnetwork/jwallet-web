/* @flow */

import { withHandlers }  from 'recompose'

import Radio from './Radio'

export default withHandlers({
  onCheck: ({ onChange, index, text }) => () => onChange(index, text),
})(Radio)
