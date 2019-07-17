// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'
import {
  Form,
  Field,
  type FormRenderProps,
} from 'react-final-form'

import {
  Button, JInputField, JLink,
} from 'components/base'
import { TitleHeader } from 'components'
import offset from 'styles/offsets.m.scss'

import style from './contactsItemEdit.m.scss'

export type Props = {|
  contactId: ContactId,
  note: string,
  name: string,
|}

function handleFormSubmit(values) {
  if (values.name == null) {
    // eslint-disable-next-line no-param-reassign, fp/no-mutation
    values.name = values.address
  }

  alert(JSON.stringify(values, null, 4))
}

export function ContactsItemEditView({
  contactId,
  name,
  note,
}: Props) {
  const initValues = {
    name,
    note,
    address: contactId,
  }
  const i18n = useI18n()

  return (
    <div className={style.core}>
      <TitleHeader
        title={i18n._('ContactsItemEdit.title', null, { defaults: 'Edit Contact' })}
        onBack={null}
      />
      <Form
        render={({
          handleSubmit,
          submitting,
          invalid,
        }: FormRenderProps) => (
          <form
            onSubmit={handleSubmit}
            className={`${style.form} ${offset.mb16}`}
          >
            <Field
              component={JInputField}
              label={i18n._('ContactsItemEdit.input.name.title', null, { defaults: 'Name' })}
              name='name'
              isDisabled={submitting}
            />
            <Field
              component={JInputField}
              label={i18n._('ContactsItemEdit.input.address.title', null, { defaults: 'Address' })}
              name='address'
              isDisabled
            />
            <Field
              className={offset.mb32}
              component={JInputField}
              label={i18n._('ContactsItemEdit.input.note.title', null, { defaults: 'Note' })}
              name='note'
              infoMessage={i18n._(
                'ContactsItemEdit.input.note.info',
                null,
                { defaults: 'This note is only visible to you.' },
              )}
              isDisabled={submitting}
            />
            <Button
              type='submit'
              isDisabled={invalid}
              isLoading={submitting}
            >
              {i18n._('ContactsItemEdit.actions.save', null, { defaults: 'Save' })}
            </Button>
          </form>
        )}
        onSubmit={handleFormSubmit}
        initialValues={initValues}
      />
      <JLink
        theme='button-secondary'
        href={`/contacts/${contactId}/delete`}
      >
        {i18n._('ContactsItemEdit.actions.delete', null, { defaults: 'Delete Contact' })}
      </JLink>
    </div>
  )
}
