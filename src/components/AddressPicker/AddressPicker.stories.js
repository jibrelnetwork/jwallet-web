// @flow strict

import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  Form,
  Field,
} from 'react-final-form'

import AddressPicker from './AddressPicker'

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

const addresses = [
  {
    address: '0x8F0cf9b5ecd978f084D667A6E8f7b534Fb6a80C1',
    name: 'Address 0',
    fiatBalance: '$100.00',
  },
  {
    address: '0x8F0cf9b5ecd978f084D667A6E8f7b534Fb6a80C2',
    name: 'Address 1',
    fiatBalance: '$101.00',
  },
  {
    address: '0x8F0cf9b5ecd978f084D667A6E8f7b534Fb6a80C3',
    name: 'Address 2',
    fiatBalance: '$0.00',
  },
  {
    address: '0x8F0cf9b5ecd978f084D667A6E8f7b534Fb6a80C4',
    name: 'Address 3',
    fiatBalance: '$29.99',
  },
]

storiesOf('Wallets|AddressPicker', module)
  .add('Default', () => (
    <div className='story'>
      {formStoryWrapper(AddressPicker, {
        addresses,
      }, { foo: '0x8F0cf9b5ecd978f084D667A6E8f7b534Fb6a80C1' })}
    </div>
  ))
