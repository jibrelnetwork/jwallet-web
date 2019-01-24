// @flow

import React from 'react'
import { Form, Field } from 'react-final-form'

import { SubsettingsView } from 'routes/Settings/components'
import { JText } from 'components/base'

import { CurrencyPickerField } from './components/CurrencyPickerField'

import './currencyView.scss'

import type {
  CurrencyFormFieldValues,
  CurrencyFormFieldErrors,
} from './types'

type Props = {
  +initialCurrencyCode: string,
  +onSubmit: (CurrencyFormFieldValues) => {},
  +validate: (CurrencyFormFieldValues) => CurrencyFormFieldErrors
}

const CurrencyView = ({
  initialCurrencyCode,
  onSubmit,
  validate,
}: Props) => (
  <SubsettingsView title='Select currency'>
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{
        currencyCode: initialCurrencyCode,
      }}
      render={({ handleSubmit }) => (
        <form className='currency-form' onSubmit={handleSubmit}>
          <Field
            name='currencyCode'
            placeholder='Currency code'
            component={CurrencyPickerField}
          />
          <button
            className='submit j-raised-button -blue'
            type='submit'
          >
            <JText value='Save' />
          </button>
        </form>
      )}
    />
  </SubsettingsView>
)

export default CurrencyView
