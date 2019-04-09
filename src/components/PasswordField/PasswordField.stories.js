// @flow strict

import React from 'react'
import { storiesOf } from '@storybook/react'
import { Form } from 'react-final-form'

import { PasswordField } from './PasswordField'

const values = {
  password: '',
  passwordConfirm: '',
}

/* eslint-disable fp/no-let, no-unused-vars, fp/no-mutation, fp/no-rest-parameters, no-console */
let isStrongPassword = false

function handleScoreChange(newValue: boolean) {
  isStrongPassword = newValue
}

function handleFormSubmit(...args) {
  console.log(args)
}
/* eslint-enable fp/no-let, no-unused-vars, fp/no-mutation, fp/no-rest-parameters, no-console */

storiesOf('PasswordField', module)
  .add('default state', () => (
    <Form
      initialValues={values}
      onSubmit={handleFormSubmit}
      render={({
        handleSubmit,
        form: {
          change: handleChange,
        },
      }) => (
        <form onSubmit={handleSubmit}>
          <PasswordField
            onChange={handleChange}
            onScoreChange={handleScoreChange}
            values={values}
            label='Label'
          />
        </form>
      )}
    />
  ))
