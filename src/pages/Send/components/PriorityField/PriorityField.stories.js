
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

import { PriorityField } from './PriorityField'
import { InputWithUnit } from './InputWithUnit/InputWithUnit'

function formStoryWrapper(
  component,
  extraProps = {},
  initialValues = {},
  validate = () => ({}),
) {
  return (
    <Form
      validate={validate}
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

storiesOf('send|PriorityFiled', module)
  .addDecorator(withKnobs)
  .add('PriorityField', () => (
    <div className='story'>
      {formStoryWrapper(PriorityField, {
      })}
    </div>
  ))
  .add('PriorityField:ETH', () => (
    <div className='story'>
      {formStoryWrapper(PriorityField, {
        isEth: true,
        blockchainFee: text('Blockchain fee', '0.00005'),
      })}
    </div>
  ))
  .add('PriorityField:error', () => (
    <div className='story'>
      {formStoryWrapper(PriorityField, {
        blockchainFee: '0.00005',
      }, {
        gasPrice: '1000', gasLimit: '1000',
      }, () => ({
        gasPrice: boolean('Gas price', true) ? 'Invalid gas price' : undefined,
        gasLimit: boolean('Gas limit', true) ? 'Invalid gas limit' : undefined,
      }))}
    </div>
  ))
  .add('InputWithUnit:default', () => (
    <div className='story' style={{ backgroundColor: '#FFF' }}>
      {formStoryWrapper(InputWithUnit, {
        label: 'Gas price',
        unit: 'Wei',
      })}
    </div>
  ))
  .add('InputWithUnit:no-unit', () => (
    <div className='story' style={{ backgroundColor: '#FFF' }}>
      {formStoryWrapper(InputWithUnit, {
        label: 'Gas price',
      })}
    </div>
  ))
  .add('InputWithUnit:error', () => (
    <div className='story' style={{ backgroundColor: '#FFF' }}>
      {formStoryWrapper(InputWithUnit, {
        label: 'Gas price',
        unit: 'GWey',
        validate: () => 'Invalid gas price',
      })}
    </div>
  ))
