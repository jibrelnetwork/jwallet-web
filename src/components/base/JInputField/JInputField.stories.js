
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Form,
  Field,
} from 'react-final-form'

import { JInputField } from './JInputField'

function formStoryWrapper(component, extraProps = {}) {
  return (
    <Form
      initialValue={{ foo: '' }}
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
  .add('Gray text', () => (
    <div className='story'>
      {formStoryWrapper(JInputField, {
        placeholder: 'Placeholder',
      })}
    </div>
  ))
  .add('Gray text disabled', () => (
    <div className='story'>
      {formStoryWrapper(JInputField, {
        isDisabled: true,
      })}
    </div>
  ))
