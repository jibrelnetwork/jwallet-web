// @flow

import React from 'react'
import { t } from 'ttag'

import {
  Form,
  Field,
} from 'react-final-form'

import proofWorker from 'workers/proof'

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

async function ping() {
  const response = await proofWorker.ping({ message: 'ping' })
  alert(response)
}

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
          <hr />
          <button
            type='button'
            className='submit j-raised-button -blue'
            onClick={ping}
          >
            <JText value={t`Ping`} />
          </button>
        </form>
      )}
    />
  </SubsettingsView>
)

export default CurrencyView
