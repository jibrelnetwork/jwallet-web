
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
      onSubmit={values => alert(JSON.stringify(values, false, 4))}
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
        title: 'Title',
      })}
    </div>
  ))
  .add('Title plus placeholder', () => (
    <div className='story'>
      {formStoryWrapper(JInputField, {
        placeholder: 'Placeholder',
        title: 'Title',
      })}
    </div>
  ))
  .add('Disabled', () => (
    <div className='story'>
      {formStoryWrapper(JInputField, {
        title: 'Disabled',
        disabled: true,
      }, { foo: 'Some text' })}
    </div>
  ))
  .add('Error and message', () => (
    <div className='story'>
      {formStoryWrapper(JInputField, {
        title: 'Title',
        infoMessage: 'Hello world',
        validate: () => 'Some error',
      })}
    </div>
  ))
