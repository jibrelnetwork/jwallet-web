// @flow

import React from 'react'
import { t } from 'ttag'

import {
  Form,
  Field,
} from 'react-final-form'

import JText from 'components/base/JText'
import SubsettingsView from 'routes/Settings/components/SubsettingsView'

import { CurrencyPickerField } from './components/CurrencyPickerField'

import './currencyView.scss'

import type {
  CurrencyFormFieldValues,
  CurrencyFormFieldErrors,
} from './types'

type Props = {|
  +onSubmit: (CurrencyFormFieldValues) => {},
  +validate: (CurrencyFormFieldValues) => CurrencyFormFieldErrors,
  +fiatCurrency: FiatCurrency,
|}

const CurrencyView = ({
  onSubmit,
  validate,
  fiatCurrency,
}: Props) => (
  <SubsettingsView title={t`Select currency`}>
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{ fiatCurrency }}
      render={({ handleSubmit }) => (
        <form className='currency-form' onSubmit={handleSubmit}>
          <Field
            component={CurrencyPickerField}
            name='fiatCurrency'
            placeholder={t`Preffered fiat currency`}
          />
          <button
            type='submit'
            className='submit j-raised-button -blue'
          >
            <JText value={t`Save`} />
          </button>
        </form>
      )}
    />
  </SubsettingsView>
)

export default CurrencyView
