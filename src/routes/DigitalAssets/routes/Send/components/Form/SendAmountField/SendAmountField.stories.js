
/* @flow */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  Form,
  Field,
} from 'react-final-form'

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
  .add('Default', () => (
    <div className='story'>
      {formStoryWrapper(SendAmountField, {
        blockchainFee: '0.0015',
        blockchainFeeCurrency: 'ETH',
        currency: 'JNT',
        fiatCurrency: 'USD',
        fiatAmount: '101.23',
        maxValue: '254.20',
      })}
    </div>
  ))
  // .add('Title plus placeholder', () => (
  //   <div className='story'>
  //     {formStoryWrapper(SendAmountField, {
  //       placeholder: 'Placeholder',
  //       label: 'Label',
  //     })}
  //   </div>
  // ))
  // .add('Disabled', () => (
  //   <div className='story'>
  //     {formStoryWrapper(SendAmountField, {
  //       label: 'Disabled',
  //       disabled: true,
  //     }, { foo: 'Some text' })}
  //   </div>
  // ))
  // .add('Error and message', () => (
  //   <div className='story'>
  //     {formStoryWrapper(SendAmountField, {
  //       label: 'Title',
  //       infoMessage: 'Hello world',
  //       validate: () => 'Some error',
  //     })}
  //   </div>
  // ))
