// @flow

import React from 'react'
import { t } from 'ttag'

import {
  Form,
  Field,
} from 'react-final-form'

import SubsettingsView from 'pages/Settings/components/SubsettingsView'

import { Button } from 'components/base'
import { CurrencyPickerField } from './components/CurrencyPickerField'

import './currencyView.scss'

import {
  type CurrencyFormFieldValues,
  type CurrencyFormFieldErrors,
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
          <Button type='submit'>{t`Save`}</Button>
        </form>
      )}
    />
  </SubsettingsView>
)

export default CurrencyView
