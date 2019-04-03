
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Form,
  Field,
} from 'react-final-form'

import {
  withKnobs,
  text,
  boolean,
} from '@storybook/addon-knobs'

import { SendAmountField } from './SendAmountField'

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

storiesOf('SendAmountField', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <div className='story'>
      {formStoryWrapper(SendAmountField, {
        blockchainFee: text('Blockchain fee', '1500000000000000'),
        currency: text('Currency', 'JNT'),
        fiatCurrency: text('Fiat currency', 'USD'),
        fiatAmount: text('Fiat amount', '100'),
        maxValue: text('Max value', '239.22'),
        isFetchingFiatAmount: boolean('Fetching fiat amount', false),
      })}
    </div>
  ))
