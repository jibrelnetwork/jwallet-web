// @flow strict

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  text,
  number,
  boolean,
  withKnobs,
} from '@storybook/addon-knobs'

import {
  Form,
  Field,
} from 'react-final-form'

import Button from 'components/base/Button'

import JTextArea from '../JTextArea'

function handleValidate(e) {
  action('handle validate')(e)
  const l = e['text-area'] ? e['text-area'].length : 0

  if (l < 10) {
    return { 'text-area': `Text to short. ${Math.abs(l - 10)} characters is left` }
  }

  return {}
}

storiesOf('base|JTextArea', module)
  .addDecorator(withKnobs)
  .add('JTextArea as is', () => (
    <div className='story' style={{ background: '#e5e5e5' }}>
      <div className='grid'>
        <JTextArea
          value={text('Input value', 'pepepe')}
          label={text('Label', 'Hello label')}
          onChange={action('handle change')}
          autoFocus
        />
      </div>
    </div>
  ))
  .add('Simple Final Form', () => (
    <div className='story' style={{ background: '#e5e5e5' }}>
      <Form
        onSubmit={action('handle submit')}
        validate={boolean('Validation', false) && handleValidate}
        render={({
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field
              component={JTextArea}
              name='text-area'
              label={text('Label', 'Enter address 🐻')}
              rows={number('Rows', 2)}
              disabled={boolean('Disabled', false)}
              offset='mb16'
            />
            <Button type='submit' theme='secondary'>Submit!</Button>
          </form>)}
      />
    </div>
  ))
