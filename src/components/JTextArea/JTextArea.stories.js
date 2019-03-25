
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  text,
  boolean,
  number,
} from '@storybook/addon-knobs'
import {
  Form,
  Field,
} from 'react-final-form'

import { JTextAreaField } from 'components'
import { JRaisedButton } from 'components/base'

storiesOf('JTextAreaField', module).addDecorator(withKnobs)
  .add('Simple Final Form', () => (
    <div className='story -blue'>
      <Form
        onSubmit={action('submit')}
        validate={action('validation')}
        render={({
          handleSubmit,
        }) => (
          <form className='story' onSubmit={handleSubmit}>
            <Field
              name='text-area'
              placeholder={text('Placeholder', 'Enter address 🐻')}
              rows={number('Rows', 2)}
              autoFocus={boolean('Autofocus', false)}
              getMeta={action('meta')}
              component={JTextAreaField}
            />
            <JRaisedButton type='submit' theme='blue'>Submit!</JRaisedButton>
          </form>)}
      />
    </div>
  ))
