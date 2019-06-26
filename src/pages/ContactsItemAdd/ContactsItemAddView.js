// @flow strict

import React from 'react'
import { t } from 'ttag'
import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import {
  Button,
  JInputField,
} from 'components/base'
import { TitleHeader } from 'components'
import { checkAddressValid } from 'utils/address'

import offset from 'styles/offsets.m.scss'

import style from './contactsItemAdd.m.scss'

export type Props = {|
  address: OwnerAddress,
  note: string,
  name: string,
|}

function handleFormSubmit(values) {
  const errors = {}

  if (!checkAddressValid(values.address)) {
    // eslint-disable-next-line no-param-reassign, fp/no-mutation
    errors.address = t`Invalid address`
  }

  if (values.name == null) {
    // eslint-disable-next-line no-param-reassign, fp/no-mutation
    values.name = values.address
  }

  alert(JSON.stringify(values, null, 4))

  return errors
}

export function ContactsItemAddView({
  address,
  name,
  note,
}: Props) {
  const initValues = {
    name,
    note,
    address,
  }

  return (
    <div className={style.core}>
      <TitleHeader
        title={t`Add Contact`}
      />
      <Form
        render={({
          handleSubmit,
          submitting,
          errors,
        }: FormRenderProps) => (
          <form
            onSubmit={handleSubmit}
            className={`${style.form} ${offset.mb16}`}
          >
            <Field
              component={JInputField}
              label={t`Name`}
              name='name'
              isDisabled={submitting}
            />
            <Field
              component={JInputField}
              label={t`Address`}
              name='address'
              errorMessage={errors.address}
              isDisabled={submitting || address}
            />
            <Field
              className={offset.mb32}
              component={JInputField}
              label={t`Note`}
              name='note'
              infoMessage={t`This note is only visible to you.`}
              isDisabled={submitting}
            />
            <Button
              type='submit'
              isLoading={submitting}
            >
              {t`Save`}
            </Button>
          </form>
        )}
        onSubmit={handleFormSubmit}
        initialValues={initValues}
      />
    </div>
  )
}
