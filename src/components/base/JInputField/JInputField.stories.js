
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  Form,
  Field,
} from 'react-final-form'

import { JInputField } from './JInputField'

function formStoryWrapper(component, extraProps = {}, initialValues = { }) {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={values => alert(JSON.stringify(values, null, 4))}
      render={({
        form,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name='foo'
            component={component}
            {...extraProps}
          />
        </form>
      )}
    />
  )
}

storiesOf('JInputField', module)
  .add('Default', () => (
    <div className='story'>
      {formStoryWrapper(JInputField, {
        label: 'Label',
      })}
    </div>
  ))
  .add('Disabled', () => (
    <div className='story'>
      {formStoryWrapper(JInputField, {
        label: 'Disabled',
        isDisabled: true,
      }, { foo: 'Some text' })}
    </div>
  ))
  .add('Error and message', () => (
    <div className='story'>
      {formStoryWrapper(JInputField, {
        label: 'Title',
        infoMessage: 'Hello world',
        validate: () => 'Some error',
      })}
    </div>
  ))
