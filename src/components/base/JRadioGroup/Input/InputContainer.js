// @flow

import { compose } from 'ramda'
import { withState, withProps, withHandlers }  from 'recompose'

import Input from './Input'

export default compose(
  withState('value', 'setValue', ''),
  withProps(({ errorMessage, checked, value }) => ({
    withError: value && checked && errorMessage,
  })),
  withHandlers({
    onCheck: ({ onChange, value }) => () => onChange('custom', value),
    onChange: ({ onChange, setValue }) => (event) => {
      const { value: newValue = '' } = event.target

      setValue(newValue)
      onChange('custom', newValue)
    },
  })
)(Input)
