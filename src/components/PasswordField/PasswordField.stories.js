/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  compose,
  withState,
} from 'recompose'

import { PasswordField } from './PasswordField'

const StateHOC = compose(
  withState('value', 'onChange', ''),
  withState('valueConfirm', 'onChangeConfirm', ''),
)

storiesOf('PasswordField', module)
  .add('default state', () => (
    <div className='story -blue'>
      {React.createElement(StateHOC(({
        onChange,
        onChangeConfirm,
        value,
        valueConfirm,
      }) => (
        <PasswordField
          onChange={onChange}
          onChangeConfirm={onChangeConfirm}
          invalidFields={{}}
          value={value}
          valueConfirm={valueConfirm}
          placeholder='Placeholder'
          placeholderConfirm='Placeholder Confirm'
        />
      )))}
    </div>
  ))
