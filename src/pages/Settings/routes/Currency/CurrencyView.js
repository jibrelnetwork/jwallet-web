// @flow

import React from 'react'
import { i18n } from 'i18n/lingui'

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
  <SubsettingsView
    title={i18n._(
      'SettingsCurrency.CurrencyView.title',
      null,
      { defaults: 'Select currency' },
    )}
  >
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{ fiatCurrency }}
      render={({ handleSubmit }) => (
        <form className='currency-form' onSubmit={handleSubmit}>
          <Field
            component={CurrencyPickerField}
            name='fiatCurrency'
            placeholder={i18n._(
              'SettingsCurrency.preferred',
              null,
              { defaults: 'Preffered fiat currency' },
            )}
          />
          <Button type='submit'>
            {i18n._(
              'SettingsCurrency.save',
              null,
              { defaults: 'Save' },
            )}
          </Button>
        </form>
      )}
    />
  </SubsettingsView>
)

export default CurrencyView
