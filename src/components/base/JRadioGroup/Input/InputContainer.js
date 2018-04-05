/* @flow */

import { compose, find, prop } from 'ramda'
import { withState, withProps, withHandlers }  from 'recompose'

import Input from './Input'

const getErrorMessage = (validators, value) => compose(
  prop('message'),
  find(({ rule }) => rule(value)),
)(validators)

export default compose(
  withState('value', 'setValue', ''),
  withProps(({ validators, value }) => ({
    errorMessage: getErrorMessage(validators, value),
  })),
  withProps(({ errorMessage, checked, value }) => ({
    withError: value && checked && errorMessage,
  })),
  withHandlers({
    onCheck: ({ onChange, validators, value }) => () =>
      onChange(
        'custom',
        getErrorMessage(validators, value)
          ? undefined
          : value
      ),
    onChange: ({ onChange, setValue, validators }) => (event) => {
      const { value: newValue = '' } = event.target
      onChange(
        'custom',
        getErrorMessage(validators, newValue)
          ? undefined
          : newValue
      )
      setValue(newValue)
    },
  })
)(Input)
