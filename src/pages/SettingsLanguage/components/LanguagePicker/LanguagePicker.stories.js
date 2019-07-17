/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Form,
  Field,
} from 'react-final-form'

import { LanguagePicker } from './LanguagePicker'

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

storiesOf('settings|LanguagePicker', module)
  .add('Default', () => (
    <div className='story'>
      {formStoryWrapper(LanguagePicker, {
      }, {
        foo: 'en',
        label: 'Currency',
      })}
    </div>
  ))
