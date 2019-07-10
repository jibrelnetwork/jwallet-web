// @flow strict

import React from 'react'
import { i18n } from 'i18n/lingui'
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
    errors.address = i18n._(
      'ContactsItemAdd.input.address.error.invalid',
      null,
      { defaults: 'Invalid address' },
    )
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
        title={i18n._('ContactsItemAdd.title', null, { defaults: 'Add Contact' })}
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
              label={i18n._(
                'ContactsItemAdd.input.name.title',
                null,
                { defaults: 'Name' },
              )}
              name='name'
              isDisabled={submitting}
            />
            <Field
              component={JInputField}
              label={i18n._(
                'ContactsItemAdd.input.address.title',
                null,
                { defaults: 'Address' },
              )}
              name='address'
              errorMessage={errors.address}
              isDisabled={submitting || address}
            />
            <Field
              className={offset.mb32}
              component={JInputField}
              label={i18n._(
                'ContactsItemAdd.input.note.title',
                null,
                { defaults: 'Note' },
              )}
              name='note'
              infoMessage={i18n._(
                'ContactsItemAdd.input.note.info',
                null,
                { defaults: 'This note is only visible to you.' },
              )}
              isDisabled={submitting}
            />
            <Button
              type='submit'
              isLoading={submitting}
            >
              {i18n._('ContactsItemAdd.actions.save', null, { defaults: 'Save' })}
            </Button>
          </form>
        )}
        onSubmit={handleFormSubmit}
        initialValues={initValues}
      />
    </div>
  )
}
